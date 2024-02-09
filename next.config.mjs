/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        DB_URL:"mongodb://127.0.0.1:27017/e-commerce",
        API_URL:"http://localhost:3000"
    }
};

export default nextConfig;
