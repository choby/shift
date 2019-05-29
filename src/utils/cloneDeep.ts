
export default function cloneDeep (obj) {
  let proto = Object.getPrototypeOf(obj);
  return Object.assign({}, Object.create(proto), obj);
}
