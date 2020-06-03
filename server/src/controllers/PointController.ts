import { Request, Response, request } from 'express';
import knex from '../database/connection';

class PointController {
    async store(request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            city,
            uf,
            latitude,
            longitude,
            items
        } = request.body;
        
        const trx = await knex.transaction();
        try {
            const point = {
                image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
                name,
                email,
                whatsapp,
                city,
                uf,
                latitude,
                longitude
            };
            
            const insertedIds = await trx('points').insert(point);
            
            const point_id = insertedIds[0];
            
            const pointItems = items.map((item_id: Number) => {
                return {
                    item_id,
                    point_id
                };
            });
            
            await trx('items_points').insert(pointItems);
            
            await trx.commit();
            
            return response.json({
                id: point_id,
                ...point
            });
        } catch (e) {
            trx.rollback()
            return response.json({ sucess: false });
        }
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const point = await knex('points').where('id', id).first();

        if(!point) {
            return response.status(400).json({ message: 'Point not found.' });
        }

        const items = await knex('items')
            .join('items_points', 'items.id', '=', 'items_points.item_id')
            .where('items_points.point_id', id)
            //.select('items.title');
        return response.json({ point, items });
    }
 
    async index(request: Request, response: Response) {
        const { city, uf, items } = request.query;

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const points = await knex('points')
            .join('items_points', 'points.id', '=', 'items_points.point_id')
            .whereIn('items_points.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');
        
        return response.json(points);
    }
}

export default PointController;