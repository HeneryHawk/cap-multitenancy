using {sap.capire.bookshop as my} from '../db/schema';

service CatalogService @(
  path     : '/browse',
  requires : 'system-user'
) {

  @readonly
  entity Books       as
    select from my.Books {
      *,
      author.name as author
    }
    excluding {
      createdBy,
      modifiedBy
    };

  entity ManageBooks as projection on my.Books;

  @requires_ : 'authenticated-user'
  action submitOrder(book : Books.ID, amount : Integer);
}
