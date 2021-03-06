import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { Dialog } from '../../au-components/dialog/dialog';

@inject(Router, Dialog, Service)
export class View {
    hasCancel = true;
    hasEdit = true;
    hasDelete = true;
    isProduct = false;
    productGift = [];

    constructor(router, dialog, service) {
        this.router = router;
        this.dialog = dialog;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;

        this.data = await this.service.getById(id);
        console.log(this.data)

        this.voucherType = this.data.voucherType;
        if(this.data.voucherType.toLowerCase() == 'product'){
            this.isProduct = true;
            this.productGift = this.data.productGift;
        }
            
        // this.unit = this.data.unit;
        // this.supplier = this.data.supplier;
        // this.deliveryOrder = this.data.deliveryOrder;
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    edit(event) {
        this.router.navigateToRoute('edit', { id: this.data.id });
    }

    delete(event) {
        this.dialog.prompt('Are you sure want to delete this voucher?', 'Delete this voucher')
            .then(response => {
                if (response.ok) {
                    console.log(event)
                    this.service.delete(this.data.id)
                        .then(result => {
                            this.list();
                        });
                    this.router.navigateToRoute('list');
                }
            });
    }

    // editCallback(event) {
    //     // this.router.navigateToRoute('edit', { id: this.data.Id });
    //     this.router.navigateToRoute('edit');
    // }

    // deleteCallback(event) {
    //     this.service.delete(this.data)
    //         .then(result => {
    //             this.list();
    //         });
    // }
}
