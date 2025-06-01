# Components

All default GOV.UK Design System Components are housed in `src/components/govuk`.

For reference, view [this GDS link](https://design-system.service.gov.uk/components/).

View a list of all the components supported by this implementation, and the links to their relevant GDS Docs page.

| Name                |                 Status                | Link                                                                        | Comments                                                                                     |
|---------------------|:-------------------------------------:|-----------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| Accordion           | Fully Supported                       | [GDS](https://design-system.service.gov.uk/components/accordion/)           |                                                                                              |
| Back Link           | Fully Supported                       | [GDS](https://design-system.service.gov.uk/components/back-link/)           |                                                                                              |
| Breadcrumbs         | Partially Supported                   | [GDS](https://design-system.service.gov.uk/components/breadcrumbs/)         | Does not collapse on mobile to first & last                                                  |
| Button              | Fully Supported                       | [GDS](https://design-system.service.gov.uk/components/button/)              | See more info [here](https://govuk.wilkin.xyz/buttons).                                      |
| ButtonGroup         | Fully Supported                       | [GDS](https://design-system.service.gov.uk/components/button/)              | Container for grouping buttons and links                                                     |
| Details             | Fully Supported                       | [GDS](https://design-system.service.gov.uk/components/details/)             |                                                                                              |
| Inset text          | Fully Supported                       | [GDS](https://design-system.service.gov.uk/components/inset-text/)          |                                                                                              |
| Notification banner | Partially Supported                   | [GDS](https://design-system.service.gov.uk/components/notification-banner/) | Does not support different styles (important, success).                                      |
| Pagination          | Barely Supported                      | [GDS](https://design-system.service.gov.uk/components/pagination/)          | Does not support most features, this is a stand-in for a wider development of the component. |
| Phase banner        | Fully Supported                       | [GDS](https://design-system.service.gov.uk/components/phase-banner/)        |                                                                                              |
| Tab (Nested)        | Fully Supported                       | [GDS](https://design-system.service.gov.uk/components/tabs/)                | Better structure using Tabs & TabGroups                                                      |
| TabGroup (Nested)   | Fully Supported                       | [GDS](https://design-system.service.gov.uk/components/tabs/)                |                                                                                              |
| Tabs (Legacy)       | Fully Supported                       | [GDS](https://design-system.service.gov.uk/components/tabs/)                |                                                                                              |
| Warning text        | Fully Supported                       | [GDS](https://design-system.service.gov.uk/components/warning-text/)        |                                                                                              |

## TabGroup and Tab Components

The `TabGroup` and `Tab` components provide an elegant nested structure for implementing GOV.UK tabs. This approach offers better developer experience compared to the legacy data-driven `Tabs` component.

### TabGroup Component

The `TabGroup` component serves as a container for organizing multiple `Tab` components with automatic tab navigation generation.

#### TabGroup Props

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `title` | `string` | No | `"Contents"` | The title displayed above the tab list |
| `id` | `string` | No | `"tabs-default"` | Unique identifier for the tab group |
| `tabs` | `Array<{title: string, id: string}>` | Yes | - | Array of tab definitions for navigation |

#### Example Usage

```astro
---
import TabGroup from "../components/govuk/TabGroup.astro";
import Tab from "../components/govuk/Tab.astro";
---

<TabGroup 
  id="my-tabs" 
  title="Choose your option"
  tabs={[
    { title: "Option 1", id: "option1" },
    { title: "Option 2", id: "option2" },
    { title: "Option 3", id: "option3" }
  ]}
>
  <Tab title="Option 1" id="option1" isFirst={true}>
    Content for the first tab
  </Tab>
  <Tab title="Option 2" id="option2">
    Content for the second tab
  </Tab>
  <Tab title="Option 3" id="option3">
    Content for the third tab
  </Tab>
</TabGroup>
```

### Tab Component

The `Tab` component represents individual tab panels within a `TabGroup`.

#### Tab Props

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `title` | `string` | Yes | - | The title of the tab (must match TabGroup tabs array) |
| `id` | `string` | Yes | - | Unique identifier for the tab (must match TabGroup tabs array) |
| `isFirst` | `boolean` | No | `false` | Whether this is the first tab (visible by default) |

#### Content

Tab components support any HTML content, including nested components:

```astro
<Tab title="Complex Content" id="complex" isFirst={true}>
  <h3 class="govuk-heading-m">Tab with Multiple Components</h3>
  <p class="govuk-body">This tab contains various components:</p>
  
  <Accordion id="nested-accordion" items={accordionData} />
  
  <Details summary="More information">
    <p class="govuk-body">Additional details here...</p>
  </Details>
  
  <Button variant="primary" href="/action">Take action</Button>
</Tab>
```

### Benefits of Nested Structure

#### Developer Experience

- **Intuitive composition**: Components nest naturally like HTML elements
- **Better readability**: Code structure matches visual hierarchy
- **Type safety**: Full TypeScript support for props and content

#### Flexibility

- **Mix components**: Combine any GOV.UK components within tabs
- **Custom content**: Include complex HTML structures and layouts
- **Dynamic content**: Easy to conditionally render tab content

#### Maintainability

- **Isolated changes**: Modify individual tabs without affecting others
- **Reusable patterns**: Create tab templates for common use cases
- **Clear separation**: Each tab's content is self-contained

### Comparison: Legacy vs Nested Approach

#### Legacy Data-Driven Approach (Tabs component)

```astro
<Tabs 
  items={[
    { 
      id: "tab1", 
      title: "Tab 1", 
      content: "<p>Simple content only</p>" 
    },
    { 
      id: "tab2", 
      title: "Tab 2", 
      component: SomeComponent 
    }
  ]} 
/>
```

**Limitations:**

- Content must be passed as strings or separate components
- Difficult to compose complex nested structures
- Less readable for complex content
- Limited flexibility for mixed content types

#### New Nested Approach (TabGroup + Tab)

```astro
<TabGroup 
  tabs={[
    { title: "Tab 1", id: "tab1" },
    { title: "Tab 2", id: "tab2" }
  ]}
>
  <Tab title="Tab 1" id="tab1" isFirst={true}>
    <h3 class="govuk-heading-m">Rich Content</h3>
    <Accordion items={data} />
    <Button>Action</Button>
  </Tab>
  <Tab title="Tab 2" id="tab2">
    <Details summary="Complex structure">
      <p class="govuk-body">Nested content...</p>
      <ul class="govuk-list govuk-list--bullet">
        <li>List item 1</li>
        <li>List item 2</li>
      </ul>
    </Details>
  </Tab>
</TabGroup>
```

**Advantages:**

- Natural component composition
- Support for complex nested structures
- Better code organization and readability
- Full flexibility in content arrangement
- Easier to maintain and extend

### Migration Guide

To migrate from the legacy `Tabs` component to the new nested structure:

1. **Replace the import:**

   ```astro
   // Old
   import Tabs from "../components/govuk/Tabs.astro";
   
   // New
   import TabGroup from "../components/govuk/TabGroup.astro";
   import Tab from "../components/govuk/Tab.astro";
   ```

2. **Transform the data structure:**

   ```astro
   // Old data format
   const tabsData = [
     { id: "tab1", title: "First Tab", content: "<p>Content</p>" },
     { id: "tab2", title: "Second Tab", content: "<p>More content</p>" }
   ];
   
   // New format (extract for TabGroup)
   const tabsConfig = [
     { title: "First Tab", id: "tab1" },
     { title: "Second Tab", id: "tab2" }
   ];
   ```

3. **Update the template:**

   ```astro
   <!-- Old -->
   <Tabs items={tabsData} />
   
   <!-- New -->
   <TabGroup tabs={tabsConfig}>
     <Tab title="First Tab" id="tab1" isFirst={true}>
       <p class="govuk-body">Content</p>
     </Tab>
     <Tab title="Second Tab" id="tab2">
       <p class="govuk-body">More content</p>
     </Tab>
   </TabGroup>
   ```

## Button and ButtonGroup Components

The `Button` and `ButtonGroup` components provide comprehensive support for all GOV.UK button patterns and variants.

### Button Component

The `Button` component supports all official GOV.UK button styles and can render as either a `<button>` element or an `<a>` element depending on whether an `href` is provided.

#### Button Props

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `children` | `string` | No | - | The text content of the button (preferred over `title`) |
| `title` | `string` | No | - | **Deprecated:** Use `children` instead |
| `variant` | `'primary' \| 'secondary' \| 'warning' \| 'start'` | No | `'primary'` | Button style variant |
| `href` | `string` | No | - | URL for link buttons (renders as `<a>` element) |
| `link` | `string` | No | - | **Deprecated:** Use `href` instead |
| `type` | `'button' \| 'submit' \| 'reset'` | No | `'button'` | Button type for form buttons |
| `disabled` | `boolean` | No | `false` | Whether the button is disabled |
| `preventDoubleClick` | `boolean` | No | `false` | Prevent double-click submissions |
| `class` | `string` | No | `''` | Additional CSS classes |
| `name` | `string` | No | - | Button name attribute |
| `value` | `string` | No | - | Button value attribute |
| `id` | `string` | No | - | Button id attribute |

#### Button Examples

**Primary Button (Default):**
```astro
<Button>Save and continue</Button>
```

**Secondary Button:**
```astro
<Button variant="secondary">Find address</Button>
```

**Warning Button:**
```astro
<Button variant="warning">Delete account</Button>
```

**Start Button:**
```astro
<Button variant="start" href="/start">Start now</Button>
```

**Disabled Button:**
```astro
<Button disabled>Disabled button</Button>
```

**Form Submit Button:**
```astro
<Button type="submit" preventDoubleClick>Confirm and send</Button>
```

**Button with Custom Attributes:**
```astro
<Button 
  type="submit" 
  name="action" 
  value="save"
  id="save-button"
  class="custom-class"
>
  Save draft
</Button>
```

### ButtonGroup Component

The `ButtonGroup` component provides a container for grouping buttons and links, ensuring proper spacing and alignment.

#### ButtonGroup Props

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `class` | `string` | No | `''` | Additional CSS classes |
| `id` | `string` | No | - | Button group id attribute |

#### ButtonGroup Examples

**Basic Button Group:**
```astro
import Button from "../components/govuk/Button.astro";
import ButtonGroup from "../components/govuk/ButtonGroup.astro";

<ButtonGroup>
  <Button type="submit">Save and continue</Button>
  <Button variant="secondary">Save as draft</Button>
</ButtonGroup>
```

**Button Group with Link:**
```astro
<ButtonGroup>
  <Button type="submit">Continue</Button>
  <a class="govuk-link" href="/cancel">Cancel</a>
</ButtonGroup>
```

**Button Group with Custom ID:**
```astro
<ButtonGroup id="form-actions">
  <Button type="submit" variant="warning">Delete</Button>
  <Button variant="secondary" href="/back">Go back</Button>
</ButtonGroup>
```

### Button Variants

#### Primary Button
The default button style for main actions:
```astro
<Button>Save and continue</Button>
```
Renders: `<button type="button" class="govuk-button" data-module="govuk-button">`

#### Secondary Button
For secondary actions or when multiple buttons are present:
```astro
<Button variant="secondary">Find address</Button>
```
Renders: `<button type="button" class="govuk-button govuk-button--secondary" data-module="govuk-button">`

#### Warning Button
For destructive actions that need emphasis:
```astro
<Button variant="warning">Delete account</Button>
```
Renders: `<button type="button" class="govuk-button govuk-button--warning" data-module="govuk-button">`

#### Start Button
For call-to-action buttons, typically used on start pages:
```astro
<Button variant="start" href="/start">Start now</Button>
```
Renders: `<a href="/start" role="button" class="govuk-button govuk-button--start" data-module="govuk-button">` with arrow icon

### Element Types

#### Link Buttons
When `href` is provided, renders as an `<a>` element:
```astro
<Button href="/next-page">Continue</Button>
```

#### Form Buttons
When no `href` is provided, renders as a `<button>` element:
```astro
<Button type="submit">Submit form</Button>
```

### Special Features

#### Prevent Double-Click
Prevents accidental double submissions:
```astro
<Button type="submit" preventDoubleClick>Confirm and send</Button>
```
Adds `data-prevent-double-click="true"` attribute.

#### Disabled State
Disables the button and adds appropriate ARIA attributes:
```astro
<Button disabled>Cannot proceed</Button>
```
Adds `disabled` and `aria-disabled="true"` attributes.

### Migration from Legacy Button

The enhanced Button component maintains backward compatibility:

**Old usage (still works):**
```astro
<Button title="Start now" link="/start" />
```

**New preferred usage:**
```astro
<Button variant="start" href="/start">Start now</Button>
```

### Best Practices

1. **Use semantic button types:** Set `type="submit"` for form submissions
2. **Provide clear labels:** Use descriptive button text
3. **Choose appropriate variants:** Use warning for destructive actions, secondary for less important actions
4. **Group related actions:** Use ButtonGroup for multiple related buttons
5. **Prevent double submissions:** Use `preventDoubleClick` for important form submissions
6. **Accessibility:** Disabled buttons automatically include proper ARIA attributes

### Accessibility Features

- **Semantic elements:** Renders as `<button>` or `<a>` based on usage
- **ARIA attributes:** Proper `aria-disabled` for disabled buttons
- **Role attributes:** Link buttons include `role="button"`
- **Focus management:** Standard keyboard navigation support
- **Screen reader support:** Clear button text and appropriate element types