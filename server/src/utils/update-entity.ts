export const updateEntity = <T extends Object>(updatedEntity: T, entity: T): T => {
  Object.keys(entity).forEach((prop) => {
    const value = entity[prop as keyof T];

    if (isNotPropIds(prop) && !!value) {
      updatedEntity[prop as keyof T] = value;
    }
  });

  return updatedEntity;
}

const propIds = {
  id: 'id',
  userId: 'userId',
  cartId: 'cartId',
};

const isNotPropIds = (prop: string): boolean => !propIds.hasOwnProperty(prop);
