const config = {
    DEV: import.meta.env.DEV,
    PROD: !import.meta.env.DEV
}

export default config