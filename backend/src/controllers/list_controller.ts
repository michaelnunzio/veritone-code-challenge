import { Request, Response } from "express";
import Item from '../models/Item';

export const allItems = async (req: Request, res: Response) => {
    const items = await Item.find((err: any, items: any) => {
      if (err) {
        res.send(err);
      } else {
        res.send(items);
      }
    });
};

export const addItem = async (req: Request, res: Response) => {
    const { itemName, description, itemAmount } = req?.body;

    const newItem = new Item({
        itemName,
        description,
        itemAmount
        });

    await newItem.save((err: any) => {
            if (err) {
            res.send(err);
            } else {
            res.send('Success- Item Added');
            }
        });
};

export const updateItem = async (req: Request, res: Response) => {
    const item = await Item.findByIdAndUpdate( req.params.id, req.body,
        (err: any) => {  
            if(err) { 
                res.send(err);
            } else {
                res.send('Success- Item Updated');
            }
    });
};

export const deleteItem = async (req: Request, res: Response) => {
    const item = await Item.deleteOne( 
        { _id: req.params.id },
        (err: any) => {  
            if(err) { 
                res.send(err);
            } else {
                res.send('Success- Item Deleted');
            }
    });
}