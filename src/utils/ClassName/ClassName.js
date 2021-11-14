export const classesToClassName = (classes) => {
    if (typeof classes === 'string') return classes;
    if (!classes || !Array.isArray(classes)) return '';

    return classes.join(' ');
};
