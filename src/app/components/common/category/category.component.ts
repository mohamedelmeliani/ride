import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    sectionTitle = [
        {
            title: 'Browse Businesses by Category',
            paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra.'
        }
    ]
    singleCategoryBox = [
        {
            icon: 'flaticon-cooking',
            title: 'Restaurant',
            numberOfPlaces: '16 Places',
            link: 'grid-listings-left-sidebar'
        },
        {
            icon: 'flaticon-hotel',
            title: 'Hotel',
            numberOfPlaces: '42 Places',
            link: 'grid-listings-left-sidebar'
        },
        {
            icon: 'flaticon-exercise',
            title: 'Fitness',
            numberOfPlaces: '11 Places',
            link: 'grid-listings-left-sidebar'
        },
        {
            icon: 'flaticon-commerce',
            title: 'Shopping',
            numberOfPlaces: '24 Places',
            link: 'grid-listings-left-sidebar'
        },
        {
            icon: 'flaticon-cleansing',
            title: 'Beauty & Spa',
            numberOfPlaces: '8 Places',
            link: 'grid-listings-left-sidebar'
        },
        {
            icon: 'flaticon-calendar',
            title: 'Events',
            numberOfPlaces: '12 Places',
            link: 'grid-listings-left-sidebar'
        },
        {
            icon: 'flaticon-heart-1',
            title: 'Health Care',
            numberOfPlaces: '16 Places',
            link: 'grid-listings-left-sidebar'
        },
        {
            icon: 'flaticon-airport',
            title: 'Travel & Public',
            numberOfPlaces: '8 Places',
            link: 'grid-listings-left-sidebar'
        },
        {
            icon: 'flaticon-car-insurance',
            title: 'Auto Insurance',
            numberOfPlaces: '10 Places',
            link: 'grid-listings-left-sidebar'
        },
        {
            icon: 'flaticon-attorney',
            title: 'Attorneys',
            numberOfPlaces: '25 Places',
            link: 'grid-listings-left-sidebar'
        },
        {
            icon: 'flaticon-plumber',
            title: 'Plumbers',
            numberOfPlaces: '5 Places',
            link: 'grid-listings-left-sidebar'
        },
        {
            icon: 'flaticon-more-1',
            title: 'More Categories',
            link: 'grid-listings-left-sidebar'
        }
    ]

}