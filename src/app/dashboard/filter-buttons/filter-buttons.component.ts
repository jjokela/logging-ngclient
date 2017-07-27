import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-filter-buttons',
    templateUrl: 'filter-buttons.component.html',
    styleUrls: ['filter-buttons.component.css']
})

export class FilterButtonsComponent implements OnInit {

    @Output() onFilterChanged = new EventEmitter<number[]>();

    selectedItems = {
        infoSelected: true,
        errorSelected: true,
        warningSelected: true,
        successSelected: true
    };

    constructor() { }

    ngOnInit() { }

    filterChanged() {
        const selectedFilters = [];
        if (this.selectedItems.errorSelected) {
            selectedFilters.push(0);
        }
        if (this.selectedItems.warningSelected) {
            selectedFilters.push(1);
        }
        if (this.selectedItems.successSelected) {
            selectedFilters.push(2);
        }
        if (this.selectedItems.infoSelected) {
            selectedFilters.push(3);
        }
        this.onFilterChanged.emit(selectedFilters);
    }

    infoClicked() {
        this.selectedItems.infoSelected = !this.selectedItems.infoSelected;
        this.filterChanged();
    }

    errorClicked() {
        this.selectedItems.errorSelected = !this.selectedItems.errorSelected;
        this.filterChanged();
    }

    successClicked() {
        this.selectedItems.successSelected = !this.selectedItems.successSelected;
        this.filterChanged();
    }

    warningClicked() {
        this.selectedItems.warningSelected = !this.selectedItems.warningSelected;
        this.filterChanged();
    }
}
