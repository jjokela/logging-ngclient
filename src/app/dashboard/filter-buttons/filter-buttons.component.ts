import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-filter-buttons',
    templateUrl: 'filter-buttons.component.html',
    styleUrls: ['filter-buttons.component.css']
})

export class FilterButtonsComponent implements OnInit {

    @Output() onFilterChanged = new EventEmitter<number[]>();

    filters = [
        {
            type: 'error',
            selected: true,
            icon: 'highlight_off',
            label: 'Error',
            index: 0
        },
        {
            type: 'warning',
            selected: true,
            icon: 'error_outline',
            label: 'Warning',
            index: 1
        },
        {
            type: 'success',
            selected: true,
            icon: 'error_outline',
            label: 'Success',
            index: 2
        },
        {
            type: 'information',
            selected: true,
            icon: 'info_outline',
            label: 'Information',
            index: 3
        }
    ];

    selectedItems = {
        infoSelected: true,
        errorSelected: true,
        warningSelected: true,
        successSelected: true
    };

    constructor() { }

    ngOnInit() { }

    filterChanged() {
        const selectedFilters = this.filters
            .filter(x => x.selected)
            .map(val => {
                return val.index;
            });
        console.log('selectedFilters');
        console.log(selectedFilters);
        this.onFilterChanged.emit(selectedFilters);
    }

    filterClicked(filter: any) {
        filter.selected = !filter.selected;
        this.filterChanged();
    }
}
