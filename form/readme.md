# Dynamic Form Creation using Final-Form

## Form Layout
![Form Layout](https://code.pan.run/prisma-access/sase-insights-group/sase-insights-ui/uploads/8a04154edb0fb8208bfafdee6763d543/Form_Layout.png)

In order to build the dynamic form with the help of json configuration, we have following terminology:-

**Layout** key:-
In our json configuration, for each nested component we have a key called layout which is supposed to tell the nature of the current component. With the help of layout key we are able to decide rendering of the respected layout.

As of know, we introduced four layouts:-
- **Page**
    - It is a top level layout in the form where we will add the concept of stepper.
    - There can be multiple pages in our form configuration

- **Section**
    - This is the next level component of the page to define a section in the form.
    - We can extend our section desgin as per future scope.
- **Group**
    - Group Layout is used to group multiple fields within the form.
    - Currently we can bind our fields within the group basis on thier size and we can extend our Group desgin as per future scope.
- **Field**
    - This is the smallest entity in the form which will define the input box type.
    - Here we are adding the validation, dependency and other field level information required to plot the field.

**properties key**
 - It is the key that contains config in array for the layouts.
 - This key can be appear on all above layouts except the field key as this is the smallest entity in layouts.
## Base JSON Schema :-
```
{
    "id": "formID",
    "type": "tab|Stepper|Normal", // TODO: future Scope
    "title": "Form Title",
    "properties": [
        {

            // Page configuration

            "title": "Page Label",
            "layout": "page",
            "properties": [

                // Section configuration

                {
                    "layout": "section",
                    "label": "Filters",
                    "properties": [ Array of Fields or Group Schema ]
                }
            ]
        }
    ]
}
```
## Group Schema
```
{
    "layout": "group",
    "label": "[Combine property Name at group level]",
    "properties": [ Array of Fields ]
}
```
## Field Schema
```
FieldSchema {
     <!-- add/edit used to overwrite any properties -->
    add?: Record<string, unknown>;
    edit?: Record<string, unknown>;
    layout?: string;
    name?: string;
    label?: string;
    // Type of field, radio or text...
    type?: FieldType;
    // For text field to set the type as number, password etc
    textType?: string;
    validator?: {
        type: string;
        message: string;
        [key: string]: string | number;
    }[];
    id?: string;
    options?: {
        value: string;
        label: string;
    }[];
    display?: string;
    size?: { [key: string]: GridSize | boolean };
    dataOptions?: {
        transformer?: string;
        query?: string;
        store?: string;
    };
    defaultSelection?: boolean;
    defaultValue?: string;
    message?: string;
    dependencies?: {
        field: "string",
        value: "string",
        to: "string",
        mode: "string"
    }[]
    helperText?: string;
    disabled?: boolean;
    placeholder?: string;
    style: {
        root?: {
            [key: string]: string | number;
        };
        component
        ?: {
            [key: string]: string | number;
        };
    }
}
```
### Available Field Type Format
   #### Chip Input
```
{
   "type": "chipInput",
}
```
### Text Input
```
{
   "type": "chipinput",
}
```
### Radio Input
```
{
   "type": "radio",
   "options": [
       { "name": "All Sub-Tenants 1", "value": "true" },
   ],
}
```
### Checkbox Input
```
{
   "type": "checkbox",
}
```
### Select Input
```
{
   "type": "select"
}
```
### Form Helper Messages
```
{
   "type": "message",
   "display": "Message Component Identifier"
}
```

### Few Sample JSONS
#### Upgrade Form Schema
```
{
    "id": "upgrade",
    "type": "tab|Stepper|Normal",
    "title": "Schedule Your Prisma Access Upgrade",
    "properties": [
        {
            "name": "Page 1",
            "title": "Page Label",
            "layout": "page",
            "properties": [
                {
                    "layout": "section",
                    "label": "Filters",
                    "properties": [
                        {
                            "layout": "field",
                            "type": "message",
                            "name": "topMessage",
                            "display": "Plain",
                            "value": "",
                            "dataOptions": {
                                "transformer": "topMessageTransformer",
                                "query": "upgradeFormInfo"
                            }
                        },
                        {
                            "layout": "field",
                            "name": "customer_chosen_location",
                            "label": "Preferred Prisma Access Locations for an upgrade *",
                            "type": "select",
                            "default": "key1",
                            "placeholder": "Select Prisma Access Location(s)",
                            "options": [],
                            "dataOptions": {
                                "transformer": "paLocationsTransformer",
                                "query": "upgradeFormInfo"
                            },
                            "validation": {
                                "required": "Please select a preferred Prisma Access location."
                            },
                            "edit": {
                                "type": "Input"
                            }
                        },
                        {
                            "layout": "field",
                            "name": "time_window",
                            "label": "Preferred time window *",
                            "helperText": "Local time zone of the selected Prisma Access location(s)",
                            "placeholder": "Select a preferred time window",
                            "type": "select",
                            "default": "key1",
                            "options": [],
                            "dataOptions": {
                                "transformer": "timeSlotsTransformer",
                                "query": "upgradeFormInfo"
                            },
                            "validation": {
                                "required": "Please select a preferred time window."
                            }
                        },
                        {
                            "layout": "field",
                            "name": "software_version",
                            "label": "Software Version",
                            "helperText": "",
                            "placeholder": "",
                            "type": "select",
                            "default": "key1",
                            "options": [],
                            "dataOptions": {
                                "transformer": "versionsTransformer",
                                "query": "upgradeFormInfo"
                            }
                        },
                        {
                            "layout": "field",
                            "type": "message",
                            "name": "bottomText1",****
                            "display": "InfoCircle",
                            "value": "",
                            "dataOptions": {
                                "transformer": "bottomText1Transformer",
                                "query": "upgradeFormInfo"
                            }
                        },
                        {
                            "layout": "field",
                            "type": "message",
                            "name": "bottomText2",
                            "display": "Html",
                            "value": "",
                            "dataOptions": {
                                "transformer": "bottomText2Transformer",
                                "query": "upgradeFormInfo"
                            }
                        },
                        {
                            "layout": "field",
                            "type": "message",
                            "name": "bottomText3",
                            "display": "Icon",
                            "value": "",
                            "dataOptions": {
                                "transformer": "bottomText3Transformer",
                                "query": "upgradeFormInfo"
                            }
                        }
                    ]
                }
            ]
        }
    ]
}
```
#### Alert Form Schema
```
{
    "id": "alert",
    "category": "tab|Stepper|Normal",
    "title": "Add Users",
    "properties": [
        {
            "name": "Page 1",
            "title": "Page Label",
            "layout": "page",
            "properties": [
                {
                    "layout": "section",
                    "title": "Filters",
                    "properties": [
                        {
                            "layout": "field",
                            "name": "email_message",
                            "type": "message",
                            "display": "Alert",
                            "message": "Select Super-Tenants to subscribe users to corresponding Alerts Notifications.<br/>Enter email addresses that you have used to register on the Palo Alto Networks HUB.",
                            "edit": {
                                "message": "Select tenants to subscribe this user to corresponding Alerts Notification"
                            }
                        },
                        {
                            "layout": "field",
                            "name": "alert_email",
                            "label": "User Email Address(es)",
                            "type": "chipInput",
                            "validator": [
                                {
                                    "type": "required",
                                    "message": "Enter valid email addresses"
                                },
                                {
                                    "type": "customEmail",
                                    "message": "Enter valid email addresses"
                                }
                            ],
                            "edit": {
                                "type": "text",
                                "disabled": true
                            }
                        },
                        {
                            "layout": "field",
                            "name": "all_sub_tenants",
                            "label": "Select Tenants",
                            "type": "radio",
                            "options": [
                                {
                                    "label": "All Sub-Tenants",
                                    "value": "true"
                                },
                                {
                                    "label": "Select Sub-Tenants",
                                    "value": "false"
                                }
                            ],
                            "validator": [
                                {
                                    "type": "required",
                                    "message": "Please select at least one sub tenant"
                                }
                            ]
                        },
                        {
                            "layout": "field",
                            "name": "sub_tenants",
                            "label": "",
                            "type": "checkbox",
                            "options": [],
                            "dataOptions": {
                                "transformer": "tenantTransformer",
                                "store": "subtenantList"
                            },
                            "dependencies": [{
                                "field": "all_sub_tenants",
                                "value": "false",
                                "to": [],
                                "mode": "enable"
                            }],
                            "validator": [
                                {
                                    "type": "required",
                                    "when": {
                                        "all_sub_tenants": "false"
                                    },
                                    "message": "Please select at least one sub tenant"
                                }
                            ],
                            "style": {
                                "root": {
                                    "paddingLeft": "40px !important"
                                }
                            }
                        }
                    ]
                }
            ]
        }
    ]
}

```


## Transformers
We are using the concept of transformer at the field level to get the dynamic data by performing action on the passed data.
For eg; data store in redux can't be use directly in the Form Checkbox creation so we need to perform some operation on it, that can be achieve by transformer.
**Note :**  Transformer is independent from the form component so we need to keep separate them in project folder.

## Mutators
React Final Form has the concept of Mutators, We used this concept to achive the dependent operation,


## Folder Structre
![FolderStructure](https://code.pan.run/prisma-access/sase-insights-group/sase-insights-ui/uploads/1518e2afaebe22709bee1af84a7b7726/image.png)



We have the following components:-

![Form Flow](https://code.pan.run/prisma-access/sase-insights-group/sase-insights-ui/uploads/a57c94bfcf2aff3228162365989ec332/image.png)

### Form Loader
This component is mediator to load the dynamic form in our project, to keep the Form Implementation clean.
Here we are doing two main operations:-
- Loading Form Definitions
- Calling Field Level APIs to fetch the data at once
```
<>
    {
        !isEmpty(schema.queries) && <QueryHandler onChange={handleChange} queries={schema.queries} filters={undefined} />
    }
    {
        <Form
            initialState={initialState.current}
            schema={schema}
            customValidators={customValidators}
            onSubmit={onSubmit}
            onCloseRequest={onCloseRequest}
            isLoading={isLoading}
            isDialog={isDialog}
            isOpen={isOpen}
            context={context}
            queryResults={queryResult}
            transformerObj={transformerObj}
        />
    }
</>
```

## Form
FormLayer is responsible to call a HOC to bind the form with dialog or keep it as a plain form based on the props.
It is also adding Form Level context to be used in future reference.
- Main Idea is here to have three key at context:-
    1. **store** - It is Form Level Context and will act as a global store for the form
    2. **queryResults** - It is data fetched from API or passed by the Loader component.
    3. **transformers** - used to build the field level data from the raw APIs data, sometimes we need to modify data fetched from the api or we might want to change it visually.
- **schema** props - It is the form json configutation for the generation of ### Form
```
<FormProvider value={{
    "store": { ...context },
    "queryResults": { ...queryResults },
    "transformers": { ...transformerObj }
}}>
    <FinalForm
        onSubmit={handleFormSubmit}
        handleAction={handleFormSubmit}
        initialValues={initialState}
        mutators={mutatorsObj}
    >
        {
            (formProps) => {
                const { form, values } = formProps;
                formRef = formProps;
                return (
                    <FormDialogMapper
                        mutators={form.mutators}
                        handleAction={handleAction}
                        allValues={values}
                        onCloseRequest={onCloseRequest}
                        isOpen={open}
                        isDialog={isDialog}
                        isLoading={isLoading}
                        schema={schema}
                    />
                )
            }
        }
    </FinalForm>
</FormProvider>
```

### Form Builder
- FormBuilder is responsible to call the **Layout Builder** once the form configuration is set.

### Layout Builder
- Layout Builder is component which will be called repeatedly from others component until we have our specific end field.
- Layout Builder is called from
    - Page Layout
    - Section Layout
    - Group Layout
- Once a FieldLayout will be called there be no further repeatation.
### FieldLayout
Field Layout is applying muliple HOCs on the FieldBuilder that is responsible to render the field, or disable the field or fetch the dynamic values required in the field.

### FieldValueMapper
This is a HoC and needs transformer function to get the values, which is placed within the analytics folder.

### WhenFieldChanges
It is HOC to apply the dependency for a field.
It is using setFieldData mutators to add the property on field and using OnChange listener.

### Validation:-
Validator Spy is the component which is responsible for the Form validation, it worked on the touched property to set the error.

-----------


#### How Form will load in any application?
To build the form in the application we will need an Application level component if there are some complexity to get the require json schema for our application.
We might need to have another component
- for apending transformer and validators.
- to fetch the dynamic data that will be require to build the form

