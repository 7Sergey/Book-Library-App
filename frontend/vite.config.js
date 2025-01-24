import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Уберите `external`, если хотите, чтобы зависимость была частью сборки
    rollupOptions: {
      // Убедитесь, что `react-redux` не указан как внешняя зависимость
      // external: ['react-redux'],
    },
  },
});
