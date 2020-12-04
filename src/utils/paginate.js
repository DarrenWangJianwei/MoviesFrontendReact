import _ from 'lodash';

export function paginate(items, pageNumber, pageSize){
    const startIndex = (pageNumber -1) * pageSize;
    //_(item) case the item to lodash object. 
    //.slice(startIndex) select all the elements from startIndex.
    //.take(pageSize) take numbers of objects which is equal to pageSize.
    //.value() return array of objects.
    return _(items).slice(startIndex).take(pageSize).value();
}