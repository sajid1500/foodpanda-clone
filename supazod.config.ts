import { defineConfig } from "supazod";

export default defineConfig({
  namingConfig: {
    // TypeScript provides autocomplete for placeholders:
    // {schema}, {table}, {operation}, {function}, {name}
    tableOperationPattern: "{schema}_{table}_{operation}",
    tableSchemaPattern: "{schema}{table}{operation}",
    enumPattern: "{schema}_{name}_Enum",
    enumSchemaPattern: "{schema}{name}",
    functionArgsPattern: "{schema}_{function}_Args",
    functionArgsSchemaPattern: "{schema}{function}Args",
    functionReturnsPattern: "{schema}_{function}_Returns",
    functionReturnsSchemaPattern: "{schema}{function}Returns",

    // Capitalization and formatting
    capitalizeSchema: true,
    capitalizeNames: true,
    separator: "_",
  },
});
