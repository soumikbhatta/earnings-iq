'use server'

import { supabase } from '@/lib/supabase'

/**
 * Test Supabase database connection
 * This server action verifies that the Supabase client is configured correctly
 */
export async function testDatabaseConnection() {
    try {
        // Try to query the signals table
        const { data, error } = await supabase
            .from('signals')
            .select('count')
            .limit(1)

        if (error) {
            return {
                success: false,
                message: 'Database connection failed',
                error: error.message,
            }
        }

        return {
            success: true,
            message: 'Successfully connected to Supabase!',
            data,
        }
    } catch (error) {
        return {
            success: false,
            message: 'Unexpected error',
            error: error instanceof Error ? error.message : 'Unknown error',
        }
    }
}
