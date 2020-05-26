# relative-goto
Visual Studio Code extension "relative-goto" allows you to jump to lines relative to the current line and select them if you wish.  
Should be used together with relative line numbers setting in VS code.

## Features
- Jumps up and down in the same editor using relative line numbers as shown by relative line settings in vs code.
    - Positive numbers to jump down
    - Negative numbers to jump up
- Select text using relative line jumping!
    - Built on top of relative line jump, and the input works the same way.
    - Allows you to select a block of text without using your mouse or touchpad by programmatically selecting from your current cursor position to the relative line jump position!
- Keeps the current character number when jumping / selecting
- On extension activation, change settings to ensure that lines numbers settings uses relative lines.
- Scroll / shift visible range to new position if the new position is out of visible range or if new position is the 'scrollOff' region.
- Changes editor.lineNumbers settings on activation to use relative line numbers.
- On activation, auto saves global keybinding of "Alt+g" or "Cmd+g" to trigger relative-goto.goto command to open the input box.

## Requirements
<!-- If you have any requirements or dependencies, add a section describing those and how to install and configure them. -->
-- NIL

## Extension Settings
Any VS Code settings through the `contributes.configuration` extension point.  
This extension contributes the following settings:
* `relative-goto.enable`: enable/disable this extension

## Known Issues
<!-- Calling out known issues can help limit users opening duplicate issues against your extension. -->
-- NIL --

## Roadmap
- [ ] Add pictures/gif showing how to use the extension
- [ ] Implement character jump. So, allow inputs like  20:30 --> line 20 char 30, where char cannot be negative. If negative, will count from backwards?
- [ ] Bundle project to reduce size
- [ ] Optimize import to only import what is needed from vs code lib
    - Use typings file for reference
    - e.g. use position.translate instead of creating a new position object
- [ ] Add settings to allow customization of jump style and default character position after jump

## Release Notes
### 0.5.2
- New Feature: Move editor's view port when previewing jump destination
    - Move view port to show jump destination in center of view port if the previewed jump destination is out of current visible range.
- Bug fix for sticky highlighting after preview and operation cancelled
    - Fixed bad code sequences that caused this.
- Bug fix for editor not shifting view port back to original position even after preview and operation cancelled.
    - Added new viewPort shift to do this.
    - *However, this does not shift back to the same visible range, this only shifts visible range so that the active cursor is revealed in the center of the view port.
        - Might have a fix for this in the future.

### 0.5.1
- Code refactor, refactored out functions from extension.ts into individual modules

### 0.5.0
- New Feature release: Preview jump destination
    - Highlights the line containing the final cursor destination after jump to allow you to preview the destination.
- Added input validation to prevent invalid inputs.
- Cleaned up some code and added minor changes such as showing info box when extension is activated.

### 0.4.0
- New Feature release: Select text using relative line jumping!
    - Allows you to select a block of text without using your mouse or touchpad by selecting from current cursor position to relative line jump position!

### 0.3.3
- Refactored internal code to extract some code blocks into standalone functions, for better future extensibility.

### 0.3.2
- Bug fix for gotos jumping up, that exceeds upper document/screen limit of line 0
    - Previously, this will fail with an error of illegal position as a line cannot be negative.
    - Now, line will jump to the first line (line 0) and maintain the same character position if available.

### 0.3.1
- Bug fix for gotos when there is a text selection.
    - Previously, the jump used the "end" position of the text selection to jump, this is an issue when there is a bottom -> up text selection, as it will jump below the bottom selection.
    - Now, jump has been changed to use "active" position of selection as the anchor to jump, allowing true relative line number jumping based on current cursor position even if there is a text selection.

### 0.3.0
- Updated range scrolling to only scroll/shift if the new position is out of visible range or in the scrollOff region.

### 0.2.0
- Setup function to ensure line numbers settings uses relative line numbers.

### 0.1.0
Initial release.

---
## License, Author and Contributing
This project is developed and made available under the "MIT License". Feel free to use it however you like!  
If you have any questions, contact us via via at tech@enkeldigital.com  
Authors:
- [JJ](https://github.com/Jaimeloeuf)