import { faker } from "@faker-js/faker";
import { test, expect } from "@playwright/test";
import { z } from "zod";
import { getAPI, postAPI, putAPI, deleteAPI } from "../utils/apiCallHelper";


export const ErrorResponseSchema = z.object({
  responseCode: z.number(),
  message: z.string().min(1),
}).strict();



test.describe('API 2: POST To All Products List', () => {
  test('POST /productsList - should return 405 method not supported', async () => {
    await test.step('Send POST request to /productsList', async () => {
      const response = await postAPI('/productsList', {});
      
      await test.step('Verify response contains responseCode 405', async () => {
        expect(response.data.responseCode).toBe(405);
      });
      
      await test.step('Verify response matches error schema', async () => {
        const validationResult = ErrorResponseSchema.safeParse(response.data);
        
        expect(validationResult.success).toBeTruthy();
        
        if (!validationResult.success) {
          console.error('Schema validation errors:', validationResult.error.issues);
        }
      });
      
      await test.step('Verify error message is "This request method is not supported."', async () => {
        expect(response.data.message).toBe('This request method is not supported.');
      });
    });
  });
});