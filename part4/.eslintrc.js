module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es2021': true,
        'node': true
    },
    'extends': 'airbnb-base',
    'rules': {
        'linebreak-style': [
            'error',
            'windows'
        ],
        'no-console': 0,
        'no-underscore-dangle': 0,
    }
}

// module.exports = {
//     'env': {
//         'browser': true,
//         'commonjs': true,
//         'es2021': true,
//         'node': true
//     },
//     'extends': 'eslint:recommended',
//     'overrides': [
//     ],
//     'parserOptions': {
//         'ecmaVersion': 'latest'
//     },
//     'rules': {
//         'eqeqeq': 'error',
//         'indent': [
//             'error',
//             2
//         ],
//         'linebreak-style': [
//             'error',
//             'windows'
//         ],
//         'quotes': [
//             'error',
//             'single'
//         ],
//         'semi': [
//             'error',
//             'never'
//         ],
//         'no-trailing-spaces': 'error',
//         'object-curly-spacing': [
//             'error', 'always'
//         ],
//         'arrow-spacing': [
//             'error', { 'before': true, 'after': true }
//         ],
//         'no-console': 0
//     }
// }
