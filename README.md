<p align="center">
  <a href="https://sweetalert2.github.io">
  <img src="https://raw.githubusercontent.com/magnobiet/sweetalert2-guards/master/assets/sweetalert2-guards-logo.png" width="498" height="200" alt="SweetAlert2 Guards">
  </a>
</p>

<h1 align="center">@magno/sweetalert2-guards</h1>

<p align="center">
  Guard your methods calls with <a href="https://sweetalert2.github.io">SweetAlert2</a> decorators!
</p>

**SweetAlert2 Guards** are a simple, opinionated solution to elegantly wrap your JavaScript methods execution in alerts, without having to mix UI and logic code.

It can be used in any framework or custom solution that uses classes and class methods (Angular, React, Vue, etc.) – because of a language limitation, decorators [can't be used on simple functions yet](https://github.com/wycats/javascript-decorators/issues/4).

```ts
//  Here's a simple example (the class is omitted)
import { Confirm, ErrorStrategy, guard } from '@magno/sweetalert2-guards';
import Swal from 'sweetalert2';

@Confirm(file => ({
  title: `Delete ${file}?`,
  text: `You won't be able to revert this!`,
  [guard.errorStrategy]: ErrorStrategy.validationError,
  [guard.onSuccess]: () => void Swal.fire('Deleted!', `${file} has been deleted`, 'success')
}))
public async deleteFile(file: string) {

  const response = await fetch(`/api/files/${file}`, { method: 'delete' });

  if (!response.ok) {
  throw new Error(`An error occurred: ${response.statusText}`);
  }

}
```

✅ Now, every code that calls this method, may it be external code, Angular template, React JSX, etc. will transparently trigger a confirmation modal.

![SweetAlert2 Guard preview](https://raw.githubusercontent.com/magnobiet/sweetalert2-guards/master/assets/sweetalert2-guards-demo.gif)

---

- [Installation & Requirements](#package-installation--requirements)
- [`@Alert()` decorator](#alert-guard) — the most basic decorator
- [`@Confirm()` decorator](#confirm-guard) — comes with confirmation dialog presets
- [`@Loader()` decorator](#loader-guard) — show a loading dialog while your method is executing
- [`[guard.*]` options](#guard-options) — control the guard's behaviour
- [Recipes](#-recipes) — *Also a list of features!*

## 📦 Installation & Requirements

Install _@magno/sweetalert2-guards_ and _sweetalert2_ via the npm registry:

```bash
npm install --save sweetalert2 @magno/sweetalert2-guards
```

[x] **TypeScript**: *Guards* is written in TypeScript – type definitions are bundled in the package.

👉 **Using Angular and liking declarative approaches?** See also [ngx-sweetalert2](https://github.com/sweetalert2/ngx-sweetalert2).

👉 **Before posting an issue**, please check that the problem isn't on SweetAlert's side.

## 🔗 API

### `@Alert()` Guard

This decorator is the simplest one. It will display an alert before your method executes, show a loading indicator when it's executing, and that's all.

<details>
<summary>Show <code>@Alert()</code>'s presets</summary>

```ts
{
  showLoaderOnConfirm: true,
  allowOutsideClick: () => !Swal.isLoading(),
  allowEscapeKey: () => !Swal.isLoading()
}
```
</details>

```ts
@Alert({
  title: 'Downloading the Internet',
  text: 'This operation will take a long time. Please be patient.',
  type: 'warning'
})
public downloadTheInternet() {
  // If the following service returns a Promise,
  // the alert will show a loading indicator.
  return this.myInternerService.download('http://*');
}
```

<details>
<summary>Show visual result</summary>
</details>

### `@Confirm()` Guard

This decorator will show a confirmation dialog with _Confirm_ and _Cancel_ buttons. The user may choose to execute the decorated method or not.

<details>
<summary>Show <code>@Confirm()</code>'s presets</summary>

```ts
{
  type: 'question',
  showCancelButton: true,
  showLoaderOnConfirm: true,
  allowOutsideClick: () => !Swal.isLoading(),
  allowEscapeKey: () => !Swal.isLoading()
}
```
</details>

```ts
@Confirm({
  title: 'Close account?',
  text: 'This will definitely close you account and you won\'t be able to login anymore.',
  type: 'warning'
})
public closeMyAccount() {
  return this.userService.closeAccount();
}
```

<details>
<summary>Show visual result</summary>
</details>

### `@Loader()` Guard

This decorator will execute the decorated method as soon as it's called, showing a loading indicator while the method is executing.

<details>
<summary>Show <code>@Loader()</code>'s presets</summary>

```ts
{
  showConfirmButton: false,
  showLoaderOnConfirm: true,
  allowOutsideClick: () => !Swal.isLoading(),
  allowEscapeKey: () => !Swal.isLoading(),
  onBeforeOpen: Swal.clickConfirm
}
```
</details>

```ts
@Loader({
  title: 'Please wait',
  text: 'This may take a few seconds...'
})
public async syncDataFromApi() {
  const datas = await this.api.getDatas();

  this.apiCache.store(datas);
}
```

<details>
<summary>Show visual result</summary>
</details>

### `[guard.*]` options

#### `[guard.invokeStrategy]`

Control how arguments are passed to the decorated method

#### `[guard.errorStrategy]`

Control how the guard reacts to execution errors (error flow control)

#### `[guard.onDismiss]`

React upon guard dialog dismissal (throw an error, return placeholder result, etc)

#### `[guard.onError]`

React upon decorated method execution failure

#### `[guard.onSuccess]`

React upon decorated method execution success

## 🍲 Recipes

### ❔ Q0: How to change the modal's parameters depending on the method's arguments?

> Instead of giving an object to the decorator (<code>@Decorator({})`</code>), pass a function (<code>@Decorator((arg1, arg2) => {})</code>)

### ❔ Q1: How to pass the SweetAlert2 modal result to the method?

> This is possible, but not recommended, especially in typed languages (like TypeScript) - except if you preserve the call signature

### ❔ Q2: How to modify the arguments passed to the method?

See Q1.

### ❔ Q3: When I click "Cancel", I want the function to return a result, not throw an exception

> Override default <code>[guard.onDismiss]</code> and return a value

### ❔ Q4: I want to return a "placeholder" result when the modal is dismissed

See Q3.

### ❔ Q5: I want to show an error or success modal when the method has terminated

> Use <code>[guard.onSuccess]</code> or <code>[guard.onError]</code> and call <code>Swal()</code>

### ❔ Q6: Can I use synchronous code in the methods?

> Yes, but return a resolved promise then
