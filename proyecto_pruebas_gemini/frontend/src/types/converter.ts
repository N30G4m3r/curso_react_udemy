export type Category = 'length' | 'weight' | 'temperature';

export type UnitsByCategory = Record<Category, string[]>;

// export interface units {
//     length: string[];
//     weight: string[];
//     temperature: string[];
// }

export interface ConversionRequest {
    category: Category;
    value: number;
    from: string;
    to: string;
}

export interface ConversionResponse {
    category: Category;
    originalValue: number;
    from: string;
    to: string;
    result: number;
    error?: string;
}