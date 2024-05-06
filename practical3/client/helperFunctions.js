
//Helper functions used throughout the project


// create Element more dynamic with id and placeholder if needed
export const createElement = (type, id, placeholder) => {
    let element = document.createElement(type)

    if (id) {
        element.id = id;
    }


    if (placeholder) {
        element.placeholder = placeholder;
    }

    return element

}

// get an element by ID
export const getElement = (id) => {
    return document.getElementById(id)
}

// append children in one function
export const appendChildren = (parent, ...elementsToAppend) => {
    elementsToAppend.forEach(element => {
        parent.appendChild(element);
    });
}

// create button with ID
export const createButton = (innerHTML, id) => {
    let element = document.createElement("button")
    element.innerHTML = innerHTML
    element.id = id;

    return element
}


//Create Form with options, id, label and default value if specified
export const createSelect = (form, options, id, labelName, defaultValue) => {
    let div = createElement("div");
    let input = createElement("select");
    input.id = id;
    input.setAttribute("style", "width: 118px");
    let label = createElement("label");
    label.setAttribute("for", id)
    label.innerHTML = labelName;

    for (let option of options) {
        let dropDownElement = document.createElement("option");
        dropDownElement.text = option;
        dropDownElement.value = option;
        input.add(dropDownElement);

        if (defaultValue) {
            if (option == defaultValue) {
                dropDownElement.selected = true
            }
        }
    }

    div.appendChild(label);
    div.appendChild(input);
    form.append(div)
}


//create input with label (specifically used to restriced a past date for the creation of the run)
export const createLabelInput = (form, type, id, labelName, placeholder, classNames = [], name = "", autocomplete = "") => {
    let div = createElement("div");
    let input = createElement("input");
    input.setAttribute("required", "True")
    input.type = type
    input.id = id;
    input.placeholder = placeholder;
    input.name = name;
    input.autocomplete = autocomplete;

    // Add multiple class names to the input element
    classNames.forEach(className => {
        input.classList.add(className);
    });

    let label = createElement("label");
    label.innerHTML = labelName;

    // disbale the option to select a past year
    if (type === "date") {
        let currentDate = new Date();
        let day = currentDate.getDate().toString().padStart(2, '0');
        let month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        let year = currentDate.getFullYear();
        let formattedDate = `${year}-${month}-${day}`;
        input.setAttribute("min", formattedDate);
    }

    div.appendChild(label);
    div.appendChild(input);
    form.append(div)
}


// create the different paces the user can select
export const createPaceList = () => {
    let paceList = [];
    for (let startValue = 3; startValue <= 9; startValue++) {
        if (startValue < 8.4) {
            for (let value = startValue; value <= startValue + 0.5; value += 0.10) {
                paceList.push(value.toFixed(2));
            }
        } else {
            paceList.push(startValue.toFixed(2));
            break;
        }
    }
    return paceList;
}
// create the different distances a user can select
export const getDistances = () => {
    let array = [];
    array.push(3)
    for (let i = 5; i <= 42; i += 5) {
        array.push(i);
    }
    array.push(42);

    return array

}

// create a select element with options, where value and key differ
export const createSelectWithOption = (form, options, id, labelName, textKey, valueKey) => {
    let div = createElement("div");
    let input = createElement("select");
    input.id = id;
    input.setAttribute("style", "width: 118px");
    let label = createElement("label");
    label.innerHTML = labelName;

    for (let option of options) {
        console.log(option)
        let dropDownElement = document.createElement("option");
        dropDownElement.text = option[textKey];
        dropDownElement.value = option[valueKey]
        input.add(dropDownElement);
    }

    div.appendChild(label);
    div.appendChild(input);
    form.append(div)
}