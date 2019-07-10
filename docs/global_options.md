# Global Options

## Overwrite default options within Application

**_this.\$toastr_** could be **_this.\$refs.toastr_**. It is depends on how you use it.

#### Change Default Plugin Timeout

```javascript
this.$toastr.defaultTimeout = 3000; // default timeout : 5000
```

#### Change Default Plugin ProgressBar

```javascript
this.$toastr.defaultProgressBar = false; // default active : true
```

#### Change Default Plugin ProgressBar Manual Value

```javascript
this.$toastr.defaultProgressBarValue = 0; // default value : null (managed by JS timer)
```

#### Change Default Plugin Type

```javascript
this.$toastr.defaultType = "error"; // default type : success
```

#### Change Default Plugin Position

```javascript
this.$toastr.defaultPosition = "toast-bottom-left"; // default position: toast-top-right
```

#### Change Default Plugin Close On Mouse Hover

```javascript
this.$toastr.defaultCloseOnHover = false; // default close on hover: true
```

#### Change Default Style

```javascript
this.$toastr.defaultStyle = { "background-color": "red" }; // default style: { }
```

### Inject your class names to toast

```javascript
this.$toastr.defaultclassNames = ["animated", "zoomInUp"]; // default classNames: []
```

## Overwrite default options via plugin options

_You can also overwrite defaults by passing options object during plugin registration_

```javascript
Vue.use(VueToastr, {
  defaultTimeout: 3000,
  defaultProgressBar: false,
  defaultProgressBarValue: 0,
  defaultType: "error",
  defaultPosition: "toast-bottom-left",
  defaultCloseOnHover: false,
  defaultStyle: { "background-color": "red" },
  defaultclassNames: ["animated", "zoomInUp"]
});
```
