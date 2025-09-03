export type TallyFieldType = 'short_text'|'paragraph'|'email'|'phone_number'|'number'|'date'|'time'|'dropdown'|'checkboxes'|'radio';

export function mapFieldType(type: string): TallyFieldType {
  switch (type) {
    case 'text': return 'short_text';
    case 'long_text': return 'paragraph';
    case 'email': return 'email';
    case 'phone': return 'phone_number';
    case 'number': return 'number';
    case 'date': return 'date';
    case 'time': return 'time';
    case 'dropdown': return 'dropdown';
    case 'checkbox': return 'checkboxes';
    case 'radio': return 'radio';
    default: return 'short_text';
  }
}

