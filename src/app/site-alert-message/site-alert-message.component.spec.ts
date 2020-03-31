/** @format */

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SiteAlertMessageComponent} from './site-alert-message.component';

describe('SiteAlertMessageComponent', () => {
    let component: SiteAlertMessageComponent;
    let fixture: ComponentFixture<SiteAlertMessageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SiteAlertMessageComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SiteAlertMessageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
