# Toast Options

| Varitable        |     default     |                                                                                                                                                                         Can Be | Desc.                                                                                                                                                          |
| ---------------- | :-------------: | -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name             |                 |                                                                                                                                                                it is up to you | Toast Name                                                                                                                                                     |
| title            |                 |                                                                                                                                                                 **_required_** | Toast Title                                                                                                                                                    |
| msg              |                 |                                                                                                                                                                 **_required_** | Toast Message                                                                                                                                                  |
| position         | toast-top-right | `'toast-top-right', 'toast-bottom-right', 'toast-bottom-left', 'toast-top-left', 'toast-top-full-width', 'toast-bottom-full-width', 'toast-top-center', 'toast-bottom-center'` | Toast Position                                                                                                                                                 |
| type             |     success     |                                                                                                                                                     info,warning,error,success | Toast Message Type                                                                                                                                             |
| classNames       |       []        |                                                                                                                                                                          array | Inline classNames option should be an array [More details](https://vuejs.org/v2/guide/class-and-style.html#Binding-Inline-Styles)                              |  |
| style            |       {}        |                                                                                                                                                                   style object | Inline style option should be an object [More details](https://vuejs.org/v2/guide/class-and-style.html#Binding-Inline-Styles)                                  |
| timeout          |      5000       |                                                                                                                                                             number miliseconds | Toast Timeout Time for auto close                                                                                                                              |
| closeOnHover     |      true       |                                                                                                                                                                  true or false | OnMouseOver toast pause/resume timeout                                                                                                                         |
| clickClose       |      false      |                                                                                                                                                                  true or false | OnClick toast close it                                                                                                                                         |
| onCreated        |                 |                                                                                                                                                                       function | toast created event                                                                                                                                            |
| onClosed         |                 |                                                                                                                                                                       function | toast closed event                                                                                                                                             |
| onClicked        |                 |                                                                                                                                                                       function | toast clicked event                                                                                                                                            |
| onMouseOver      |                 |                                                                                                                                                                       function | toast mouseover event                                                                                                                                          |
| onMouseOut       |                 |                                                                                                                                                                       function | toast mouseout event                                                                                                                                           |
| progressbar      |      true       |                                                                                                                                                                  true or false | show progressbar or not                                                                                                                                        |
| progressBarValue |                 |                                                                                                                                                                         0..100 | Initial value of the progress bar in percents which does mean the progress bar is controlled by timeout; use this.\$toastr.setProgress(aToast, newValue) later |

```javascript
{
        name: "Toast Name",
        title: "Toast Title",
        msg: "Toast Message",
        position: "toast-top-right",
        type: "success",
        timeout: 5000,
        progressbar: true,
        //progressBarValue:"", // if you want set progressbar value
        style:{},
        classNames: ["animated", "zoomInUp"],
        closeOnHover: true
        clickClose: false
        onCreated: ()=>{},
        onClicked: ()=>{},
        onClosed: ()=>{},
        onMouseOver: ()=>{},
        onMouseOut: ()=>{},
}
```
