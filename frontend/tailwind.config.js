module.exports = {
    content: ["./src/**/*.tsx"],
    theme: {
        extend: {
            colors: {
                main: "#252e33",
                hover: "#3f474b",
                h1: "#646a6e",
                p: "#717172",
            }
        },
    },
    plugins: [require("tailwind-scrollbar")],
}