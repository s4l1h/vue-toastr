# Installation

## Direct Download / CDN

https://unpkg.com/vue-toastr/dist/vue-toastr

[unpkg.com](https://unpkg.com) provides NPM-based CDN links. The above link will always point to the latest release on NPM. You can also use a specific version/tag via URLs like https://unpkg.com/vue-toastr@{{ \$version }}/dist/vue-toastr.js

Include vue-toastr after Vue and it will install itself automatically:

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-toastr/dist/vue-toastr.umd.min.js"></script>
```

You can use **runtime only build of Vue** (`vue.runtime.min.js`) because
`vue-toastr` doesn't need to template compiler..

## NPM

```sh
$ npm install vue-toastr
```

## Yarn

```sh
$ yarn add vue-toastr
```

## Dev Build

You will have to clone directly from GitHub and build `vue-toastr` yourself if
you want to use the latest dev build.

```sh
$ git clone https://github.com/s4l1h/vue-toastr.git node_modules/vue-toastr
$ cd node_modules/vue-toastr
$ yarn install
$ yarn run build
```
