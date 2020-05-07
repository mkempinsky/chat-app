export const gray = (shade) => {
    const shades = {
        100: '#fafafa',
        200: '#f2f2f2',
        300: '#d0d1d3',
        400: '#a6a7a8',
        500: '#3e3e3f',
        default: '#f2f2f2',
    };

    return shades[+shade] || shades.default;
};
export const teal = (shade) => {
    const shades = {
        100: '#def2f1',
        200: '#b0dfdc',
        300: '#3aafa9',
        400: '#2b7a78',
        500: '#17252a	',
        default: '#b0dfdc',
    };

    return shades[+shade] || shades.default;
};

export const BREAKPOINT = '992px';

export const globalStyles = `
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}
	html, body {
		height: 100%;
		font-family: 'Baloo Paaji 2', cursive;
		color: #1C2838;
		font-size: 16px;
	}
	html {
		-webkit-font-smoothing: antialiased;
	}
	:root {
		--border-radius: 5px;

		--success: #5ab75c;
		--warning: #faa632;
		--error: #da4f4a;

		--gray-100: ${gray(100)};
		--gray-200: ${gray(200)};
		--gray-300: ${gray(300)};
		--gray-400: ${gray(400)};
		--gray-500: ${gray(500)};

		--teal-100: ${teal(100)};
		--teal-200: ${teal(200)};
		--teal-300: ${teal(300)};
		--teal-400: ${teal(400)};
		--teal-500: ${teal(500)};

		--gradient-teal: linear-gradient(to right, ${teal(200)}, ${teal(300)});


		--h1-size: 45px;
		--h1-size-desktop: 65px;
	}



	h1 {
		font-size: var(--h1-size);
	}
	@media screen and (min-width: ${BREAKPOINT}){
		h1 {
			font-size: var(--h1-size-desktop);
		}
	}
	div,
	p,
	span,
	input {
		font-family: 'Baloo Paaji 2', cursive;
		font-size: 16px;
	}

`;
