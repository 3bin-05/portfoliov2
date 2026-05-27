# Implementation Plan: Kinetic Typography Component (Tailwind CSS)

## Overview
This plan outlines the steps to build a reusable React component featuring a kinetic typography background behind a user profile image (`eb.png`). The implementation will rely entirely on Tailwind CSS utility classes and inline styles for dynamic animations, removing the need for external CSS files.

## 1. Prerequisites
- [x] Ensure the project is a React environment with Tailwind CSS fully configured.
- [x] Confirm the profile image (`eb.png`) is available in the project's assets directory.

## 2. File Setup
- [x] Create a new file named `KineticProfile.tsx` in your components folder (e.g., `src/components/KineticProfile.tsx`).

## 3. Component Scaffolding
Inside `KineticProfile.tsx`:
- [x] Import `React`.
- [x] Import the image: `import ebImage from '../assets/eb.png';`.
- [x] Define the `KineticProfile` functional component.
- [x] Define an array of animation durations inside the component to handle the staggered speeds: `const rowDurations = [25, 32, 22, 28, 35, 24, 30];`.
- [x] Define the repeating text string: `const repeatingText = "EBIN REJI EBIN REJI EBIN REJI EBIN REJI EBIN REJI ";`.

## 4. Construct the UI Layout (JSX & Tailwind)
Implement the component structure using Tailwind utility classes.

**Tasks:**
- [x] **Main Wrapper:** Create an outer `<div>` with relative positioning to contain both the background and foreground. Use `relative flex justify-center items-center w-full max-w-2xl mx-auto min-h-[500px]`.
- [x] **Keyframe Injection:** Add a `<style>` block inside the wrapper to define `@keyframes kinetic-scroll`. This keeps the component self-contained without touching `tailwind.config.js`.
  ```jsx
  <style>
    {`
      @keyframes kinetic-scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
    `}
  </style>
  ```
- [x] **Background Container:** Create the container for the scrolling text. Make it absolute, centered, slightly wider than the parent, and unclickable: `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-full overflow-hidden flex flex-col justify-center z-[1] pointer-events-none`.
- [x] **Gradient Masks:** Inside the background container, add two `<div>` elements for the left and right edges.
  - Left: `absolute top-0 bottom-0 left-0 w-[20%] z-[5] bg-gradient-to-r from-[var(--bg-primary)] to-transparent pointer-events-none`.
  - Right: `absolute top-0 bottom-0 right-0 w-[20%] z-[5] bg-gradient-to-l from-[var(--bg-primary)] to-transparent pointer-events-none`.

## 5. Implement the Scrolling Text Loop
Inside the Background Container (between the gradient masks):
- [x] Map over the `rowDurations` array to render multiple rows.
- [x] **Row Wrapper:** For each mapped item, create a `<div>` with typography and opacity styling: `flex whitespace-nowrap overflow-hidden opacity-[0.09] dark:opacity-[0.05] font-black text-[3.2rem] md:text-[4.5rem] lg:text-[5.5rem] leading-[1.0] uppercase text-[var(--text-primary)] my-0.5 select-none`.
- [x] **Animation Wrapper:** Inside the row, create a `<div>` that handles the movement: `flex will-change-transform`. Apply the inline style to use the specific duration for that row: `style={{ animation: \`kinetic-scroll \${duration}s linear infinite \${isReverse ? 'reverse' : 'normal'}\` }}`.
- [x] **Text Elements:** Inside the animation wrapper, render two identical `<span>` elements containing the `repeatingText` with right padding (`pr-8`). This double span is required for the seamless infinite loop.

## 6. Add the Foreground Image
Below the Background Container, inside the Main Wrapper:
- [x] Create a container for the image with relative positioning and a higher z-index: `relative z-10 w-[280px] xl:w-[350px] mx-auto mt-16 xl:mt-0 pointer-events-auto`.
- [x] Render the `<img>` tag using the imported `ebImage`. Add Tailwind classes for styling and a shadow: `w-full h-auto object-cover rounded-[28px]`.

## 7. Integration & Review
- [x] Export the `KineticProfile` component.
- [x] Import and render `<KineticProfile />` in the desired location within your application (the right side of the "About Me" section).
- [x] Verify the animation runs smoothly, the image sits cleanly on top, and the text fades nicely at the edges.