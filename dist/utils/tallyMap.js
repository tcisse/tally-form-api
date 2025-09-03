export function mapFieldType(type) {
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
