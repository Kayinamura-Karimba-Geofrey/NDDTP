import dataSource from '../data-source';
import { Warehouse } from '../entities/warehouse.entity';
import { InventoryItem } from '../entities/inventory-item.entity';
import { DEFAULT_WAREHOUSES, DEFAULT_ITEMS } from '../../common/constants';
import { ItemCategory, UnitOfMeasure, WarehouseStatus } from '../../common/enums';

async function seed(): Promise<void> {
  await dataSource.initialize();
  const whRepo = dataSource.getRepository(Warehouse);
  const itemRepo = dataSource.getRepository(InventoryItem);

  for (const w of DEFAULT_WAREHOUSES) {
    const exists = await whRepo.findOne({ where: { code: w.code } });
    if (!exists) {
      await whRepo.save({ code: w.code, name: w.name, location: w.location, status: WarehouseStatus.ACTIVE });
      console.log(`Seeded warehouse: ${w.code}`);
    }
  }

  for (const i of DEFAULT_ITEMS) {
    const exists = await itemRepo.findOne({ where: { sku: i.sku } });
    if (!exists) {
      await itemRepo.save({
        sku: i.sku,
        name: i.name,
        category: i.category as ItemCategory,
        unit: i.unit as UnitOfMeasure,
        reorderLevel: i.reorderLevel,
        isActive: true,
      });
      console.log(`Seeded item: ${i.sku}`);
    }
  }

  await dataSource.destroy();
  console.log('Inventory seed complete');
}

seed().catch((e) => { console.error(e); process.exit(1); });
