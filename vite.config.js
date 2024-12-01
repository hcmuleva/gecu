import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    base: '/gecu/', // Ensure this matches the context root

    build: {
        manifest: true,
    }
   
});
