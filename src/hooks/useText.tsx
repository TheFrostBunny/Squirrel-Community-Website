import { useState, useEffect } from 'react';

interface TextData {
  [key: string]: any;
}

let textData: TextData | null = null;

export const useText = () => {
  const [data, setData] = useState<TextData | null>(textData);
  const [loading, setLoading] = useState(!textData);

  useEffect(() => {
    if (!textData) {
      import('../data/text.json')
        .then((module) => {
          textData = module.default;
          setData(textData);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Failed to load text data:', error);
          setLoading(false);
        });
    }
  }, []);

  const getText = (path: string, replacements?: Record<string, string | number>) => {
    if (!data) return path;
    
    const keys = path.split('.');
    let value: any = data;
    
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        return path; // Return path if not found
      }
    }
    
    if (typeof value !== 'string') {
      return path;
    }
    
    // Replace placeholders like {count}, {name}, etc.
    if (replacements) {
      let result = value;
      Object.entries(replacements).forEach(([key, replacement]) => {
        result = result.replace(new RegExp(`{${key}}`, 'g'), String(replacement));
      });
      return result;
    }
    
    return value;
  };

  return { getText, loading, data };
};