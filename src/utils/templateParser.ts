/**
 * Replaces placeholders in a template string with values from a context object.
 * Placeholders should use the syntax ${variableName}.
 *
 * @param templateString The string containing placeholders.
 * @param context The object containing key-value pairs for replacement.
 * @returns The string with placeholders replaced by context values.
 */
export function parseTemplate(
  templateString: string,
  context: Record<string, any>
): string {
  return templateString.replace(/\$\{(\w+)\}/g, (match, key) => {
    if (context.hasOwnProperty(key)) {
      return String(context[key]);
    }
    // Optionally, handle missing keys (e.g., return empty string, throw error, or keep placeholder)
    return match; // Keep the placeholder if the key is not found in the context
  });
}
