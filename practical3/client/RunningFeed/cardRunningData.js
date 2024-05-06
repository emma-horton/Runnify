
function createLeftPart(runningData) {
    // left part for showing running data
    let leftPart = document.createElement("div");
    leftPart.className = "left_part";

    runningData.forEach(data => {
        let dataItem = document.createElement("div");
        dataItem.className = "data_item";

        let dataItemContent = document.createElement("div");
        dataItemContent.className = "data_item_content";

        let dataLabel = document.createElement("span");
        dataLabel.className = "data_label";
        dataLabel.textContent = data.label;

        let dataValue = document.createElement("span");
        dataValue.className = "data_value";
        dataValue.textContent = data.value;

        dataItemContent.appendChild(dataLabel);
        dataItemContent.appendChild(dataValue);

        dataItem.appendChild(dataItemContent);
        leftPart.appendChild(dataItem);
    });

    return leftPart;
}