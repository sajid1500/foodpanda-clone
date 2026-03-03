# Foodpanda BD Design System Integration

## ✅ Completed Steps

### Step 1: Font Integration

- Fonts are inherited from existing configuration (Geist Sans, Geist Mono, Inter)
- Foodpanda uses: 'Open Sans' and 'PP Agrandir' (can be added via `@import` in globals.css if needed)

### Step 2: Color Conversion to Hex Format

All Foodpanda colors have been converted from their RGB/Hex variants and mapped to Tailwind v4 compatible hex format.

### Step 3: Global CSS Update (@theme)

✅ Updated `app/globals.css` @theme block with:

- Tailwind v4 compatible color variables
- Foodpanda border radius system (4px, 8px, 12px, 16px, 20px, 24px)
- Proper spacing references

### Step 4: Shadcn Bridge - Variable Mapping

**Light Mode (:root)**

```css
--primary: #e21b70 /* Foodpanda Main Pink */ --primary-foreground: #ffffff
  /* White text on pink */ --secondary: #2e3138 /* Dark Gray */
  --accent: #f77c99 /* Light Pink */ --muted: #f7f8f8 /* Light Surface */
  --border: #d3d5d7 /* Neutral Border */ --destructive: #bb2800 /* Error Red */
  --card: #ffffff /* White cards */ --popover: #ffffff /* White popover */;
```

**Dark Mode (.dark)**

```css
--primary: #ff2b85 /* Brighter Pink */ --accent: #ffdddd
  /* Light Pink highlights */ --background: #090c0f /* Very Dark Background */
  --card: #171f26 /* Dark Card Background */;
```

### Step 5: Border & Stroke Logic

```css
--radius: 0.5rem (8px base) --radius-sm: 4px --radius-md: 8px --radius-lg: 12px
  --radius-xl: 16px --radius-2xl: 16px --radius-3xl: 20px --radius-4xl: 24px;
```

Matching Foodpanda's:

```
--bdsCornerRadiusBase: 8px
--bdsCornerRadiusField: 12px
--bdsCornerRadiusPill: 9999px
```

### Step 6: Component Styling

✅ Updated `app/_components/ui/command.tsx`:

- Changed border-radius from `rounded-md` to `rounded-lg` (12px)
- Enabled default className styling for Command component
- Added padding-top to CommandList for spacing between input and suggestions (pt-2)

### Step 7: Skeleton Styling

Foodpanda skeleton colors:

```
--bdsColorSurfaceSkeleton: #E8E9EA         /* Skeleton background */
--bdsColorSurfaceSkeletonHighlighted: #ffffff  /* Highlighted skeleton */
```

These can be added to a Skeleton component configuration:

```tsx
@keyframes skeleton-pulse {
  0%, 100% { background-color: #E8E9EA; }
  50% { background-color: #F7F8F8; }
}
```

## 🎨 Key Color Usage Guide

| Usage           | Color          | Hex     | Dark Mode              |
| --------------- | -------------- | ------- | ---------------------- |
| Primary Actions | Foodpanda Pink | #e21b70 | #ff2b85                |
| Secondary       | Dark Gray      | #2E3138 | #E3E6E8                |
| Accents         | Light Pink     | #F77C99 | #FFDDDD                |
| Backgrounds     | White          | #ffffff | #090C0F                |
| Cards           | White          | #ffffff | #171F26                |
| Borders         | Neutral Gray   | #D3D5D7 | rgba(255,255,255,0.15) |
| Text Primary    | Dark Gray      | #2E3138 | #ffffff                |
| Text Secondary  | Medium Gray    | #B7BABC | #B7BABC                |
| Error           | Red            | #bb2800 | #FFE3DB                |
| Success         | Green          | #3c8264 | #52B788                |
| Warning         | Amber          | #fcc54c | #FFD60A                |
| Info            | Blue           | #25537C | #5DADE2                |

## 📋 Additional Foodpanda Design Tokens

### Spacing (Use Tailwind defaults)

```
xs: 8px, sm: 16px, md: 24px, lg: 32px, xl: 48px
```

### Shadows (Foodpanda Elevation)

```
--bdsElevationLow: 0px 0px 24px 0px rgba(0,0,0,0.16)
--bdsElevationMedium: 0px 0px 48px 0px rgba(0,0,0,0.24)
--bdsElevationHigh: 0px 0px 96px 0px rgba(0,0,0,0.24)
```

### Typography (Foodpanda)

- **Labels**: 'Open Sans', 600 weight, 0.75rem (small), 1rem (large)
- **Titles**: 'PP Agrandir', 700-900 weight, 1rem to 2.5rem
- **Body**: 'Open Sans', 400 weight, 0.75rem to 1rem

## 🔄 Next Steps

1. **Add fonts** - Import 'Open Sans' and 'PP Agrandir' from Google Fonts:

   ```css
   @import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=PP+Agrandir:wght@600;700;900&display=swap");
   ```

2. **Apply to components** - Update components to use the new color system
3. **Test dark mode** - Verify dark mode colors render correctly
4. **Create component library** - Document component variants with Foodpanda theme

## 📝 References

All color values source from Foodpanda BD design system colors provided:

- Primary: #e21b70 (Bright), #c21760 (Dark variant)
- Secondary: #2E3138 (Neutral primary text)
- Accent: #F77C99 (Secondary pink)
- Highlights: #FFDDDD, #FFEBEB, #FDF2F7
