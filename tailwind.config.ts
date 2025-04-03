import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
	'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
	'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
	'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	variants: {
    extend: {
        display: ["group-hover"],
    },
	},
  theme: {
  	extend: {
  		fontFamily: {
  			sans: [
  				'var(--font-urbanist)'
  			],
        inter: ['Inter', 'sans-serif']
  		},
  		borderWidth: {
  			'0.5': '0.5px'
  		},
  		borderColor: {
  			'button-gold': '#E4B201',
  			'button-back': '#E6E6E6'
  		},
  		boxShadow: {
  			button: '0px 4px 8px 0px #00000040',
  			sunlight12: '0px 2px 2px 0px #00000040',
  			sunlight1: '1px 1px 2px 0px #00000040',
  			sunlight2: '1px 1px 2px 0px #00000040',
  			sunlight3: '2px 0px 2px 0px #00000040',
  			sunlight4: '1px -1px 2px 0px #00000040',
  			sunlight5: '1px -1px 2px 0px #00000040',
  			sunlight6: '0px -2px 2px 0px #00000040',
  			sunlight7: '-1px -1px 2px 0px #00000040',
  			sunlight8: '-1px -1px 2px 0px #00000040',
  			sunlight9: '-2px 0px 2px 0px #00000040',
  			sunlight10: '-1px 1px 2px 0px #00000040',
  			sunlight11: '-1px 1px 2px 0px #00000040'
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  		},
  		black2: {
  			'black-2': 'rgba(0,0,0,0.02)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
};
export default config;
