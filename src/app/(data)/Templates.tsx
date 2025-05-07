export const Template = [
    {
        name: "Blog Title",
        description: "An AI tool that generates blog titles based on your blog information.",
        category: "Blog",
        icon: "https://cdn-icons-png.flaticon.com/128/2065/2065213.png",
        aiPrompt: "Give me 5 blog topic ideas in wise only based on given niche topic and give me result in Rich text editor format.",
        slug: "generate-blog-title",
        form: [
            {
                label: "Enter your blog niche",
                field: 'input',
                name: "niche",
                required: true
            },
            {
                label: "Enter blog outline",
                field: "textarea",
                name: "outline"
            }
        ]
    },
    {
        name: "Social Media Caption Generator",
        description: "Generate engaging social media captions based on your product or message.",
        category: "Social Media",
        icon: "https://cdn-icons-png.flaticon.com/128/1384/1384031.png",
        aiPrompt: "Generate 5 creative and engaging social media captions for the given product or message.",
        slug: "caption-generator",
        form: [
            {
                label: "Enter your product or message",
                field: 'textarea',
                name: "message",
                required: true
            },
            {
                label: "Choose platform",
                field: "input",
                name: "platform"
            }
        ]
    },
    {
        name: "SEO Meta Description Generator",
        description: "Creates SEO-friendly meta descriptions for your webpage content.",
        category: "SEO",
        icon: "https://cdn-icons-png.flaticon.com/128/3208/3208707.png",
        aiPrompt: "Generate an SEO optimized meta description based on the given page content.",
        slug: "seo-meta-generator",
        form: [
            {
                label: "Enter webpage content",
                field: "textarea",
                name: "content",
                required: true
            },
            {
                label: "Enter target keyword",
                field: "input",
                name: "keyword"
            }
        ]
    },
    {
        name: "Email Subject Line Generator",
        description: "Craft compelling email subject lines to improve open rates.",
        category: "Email Marketing",
        icon: "https://cdn-icons-png.flaticon.com/128/561/561127.png",
        aiPrompt: "Generate 5 catchy email subject lines for the given email content.",
        slug: "email-subject-generator",
        form: [
            {
                label: "Enter email content or summary",
                field: "textarea",
                name: "emailContent",
                required: true
            }
        ]
    },
    {
        name: "Product Description Writer",
        description: "Generate persuasive product descriptions that boost conversions.",
        category: "E-commerce",
        icon: "https://cdn-icons-png.flaticon.com/128/1042/1042333.png",
        aiPrompt: "Write a high-converting product description based on the input details.",
        slug: "product-description-writer",
        form: [
            {
                label: "Enter product name",
                field: "input",
                name: "productName",
                required: true
            },
            {
                label: "Enter product features or details",
                field: "textarea",
                name: "features",
                required: true
            }
        ]
    }
]
