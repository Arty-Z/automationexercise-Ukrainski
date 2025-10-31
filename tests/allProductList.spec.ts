import { faker } from "@faker-js/faker";
import { test, expect } from "@playwright/test";
import { z } from "zod";
import { getAPI, postAPI, putAPI, deleteAPI } from "../utils/apiCallHelper";


export const ProductsResponseSchema = z.object({
  responseCode: z.literal(200),
  products: z.array(
    z.object({
      id: z.number().int().positive(),
      name: z.string().min(1),
      price: z.string().regex(/^Rs\.\s*\d+$/, 'Price must look like "Rs. 500"'),
      brand: z.string().min(1),
      category: z.object({
        usertype: z.object({
          usertype: z.enum(["Women", "Men", "Kids"]),
        }),
        category: z.enum([
          "Tops",
          "Tshirts",
          "Dress",
          "Tops & Shirts",
          "Jeans",
          "Saree",
        ]),
      }),
    }).strict()
  ).nonempty(),
}).strict();

test.describe('API 1: Get All Products List', () => {
  test('GET /productsList - should return all products list with 200 status', async () => {
    await test.step('Send GET request to /productsList', async () => {
      const response = await getAPI('/productsList');
      
      await test.step('Verify response status code is 200', async () => {
        expect(response.status).toBe(200);
      });
      
      await test.step('Verify response matches schema and contains products list', async () => {
        const validationResult = ProductsResponseSchema.safeParse(response.data);
        
        expect(validationResult.success).toBeTruthy();
        
        if (!validationResult.success) {
          console.error('Schema validation errors:', validationResult.error.issues);
        }
      });
      
      await test.step('Verify products list is not empty', async () => {
        expect(response.data.products.length).toBeGreaterThan(0);
      });
      
      await test.step('Verify first product has all required fields', async () => {
        const firstProduct = response.data.products[0];
        
        expect(firstProduct).toHaveProperty('id');
        expect(firstProduct).toHaveProperty('name');
        expect(firstProduct).toHaveProperty('price');
        expect(firstProduct).toHaveProperty('brand');
        expect(firstProduct).toHaveProperty('category');
        expect(firstProduct.category).toHaveProperty('usertype');
        expect(firstProduct.category).toHaveProperty('category');
      });
    });
  });
});