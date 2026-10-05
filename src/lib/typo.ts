/**
 * Sarlavha shrifti (Nunito)da ʻ (U+02BB) va ʼ (U+02BC) belgilari keng bo'shliq bilan chiziladi.
 * Faqat sarlavhalarda ularni vizual jihatdan bir xil ‘ ’ belgilariga almashtiramiz.
 */
export const display = (text: string) => text.replace(/ʻ/g, '‘').replace(/ʼ/g, '’');
