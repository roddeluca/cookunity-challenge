const data: Record<string, any> = {}

module.exports = {
    createClient() {
        return {
            get(key: string): any {
                return data[key];
            },
            set(key: string, value: any) {
                data[key] = value
            },
            async connect() {},
            async disconnect() {}
        }
    }
}