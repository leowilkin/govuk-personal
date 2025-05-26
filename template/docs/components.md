# Components

All default GOV.UK Design System Components are housed in `src/components/govuk`.

For reference, view [this GDS link](https://design-system.service.gov.uk/components/).

View a list of all the components supported by this implementation, and the links to their relevant GDS Docs page.

| Name                |                 Status                | Link                                                                       | Comments                                                                                     |
|---------------------|:-------------------------------------:|-----------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| Accordion           | Fully Supported                       | [GDS](https://design-system.service.gov.uk/components/accordion/)           |                                                                                              |
| Back Link           | Fully Supported                       | [GDS](https://design-system.service.gov.uk/components/back-link/)           |                                                                                              |
| Breadcrumbs         | Partially Supported                   | [GDS](https://design-system.service.gov.uk/components/breadcrumbs/)         | Does not collapse on mobile to first & last                                                  |
| Button              | Partially Supported                   | [GDS](https://design-system.service.gov.uk/components/button/)              | Does not support different styles, currently using the 'Start now' type as default.          |
| Details             | Fully Supported                       | [GDS](https://design-system.service.gov.uk/components/details/)             |                                                                                              |
| Inset text          | Fully Supported                       | [GDS](https://design-system.service.gov.uk/components/inset-text/)          |                                                                                              |
| Notification banner | Partially Supported                   | [GDS](https://design-system.service.gov.uk/components/notification-banner/) | Does not support different styles (important, success).                                      |
| Pagination          | Barely Supported                      | [GDS](https://design-system.service.gov.uk/components/pagination/)          | Does not support most features, this is a stand-in for a wider development of the component. |
| Phase banner        | Fully Supported                       | [GDS](https://design-system.service.gov.uk/components/phase-banner/)        |                                                                                              |
| Tab (Nested)        | Fully Supported                       | [GDS](https://design-system.service.gov.uk/components/tabs/)                | Enhanced nested component structure using TabGroup and Tab components                        |
| TabGroup (Nested)   | Fully Supported                       | [GDS](https://design-system.service.gov.uk/components/tabs/)                | Container component for organizing multiple Tab components                                   |
| Tabs (Legacy)       | Fully Supported                       | [GDS](https://design-system.service.gov.uk/components/tabs/)                | Data-driven approach, use TabGroup/Tab for new implementations                              |
| Warning text        | Fully Supported                       | [GDS](https://design-system.service.gov.uk/components/warning-text/)        |                                                                                              |

## TabGroup and Tab Components

The `TabGroup` and `Tab` components provide an elegant nested structure for implementing GOV.UK tabs. This approach offers better developer experience compared to the legacy data-driven `Tabs` component.

### TabGroup Component

The `TabGroup` component serves as a container for organizing multiple `Tab` components with automatic tab navigation generation.

#### Props

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

#### Props

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

### Best Practices

1. **Always mark the first tab:** Set `isFirst={true}` on the first `Tab` component
2. **Consistent IDs:** Ensure `id` and `title` props match between `TabGroup.tabs` array and individual `Tab` components
3. **Meaningful titles:** Use descriptive tab titles for better accessibility
4. **Unique IDs:** Ensure tab IDs are unique across the entire page
5. **Semantic content:** Structure tab content with proper headings and GOV.UK classes

### Accessibility

The components maintain full GOV.UK accessibility standards:
- Proper ARIA labels and relationships
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Progressive enhancement

Both components work seamlessly with the GOV.UK Frontend JavaScript for enhanced functionality.