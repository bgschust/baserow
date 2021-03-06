import { Registerable } from '@baserow/modules/core/registry'
import ApplicationForm from '@baserow/modules/core/components/application/ApplicationForm'

/**
 * The application type base class that can be extended when creating a plugin
 * for the frontend.
 */
export class ApplicationType extends Registerable {
  /**
   * The font awesome 5 icon name that is used as convenience for the user to
   * recognize certain application types. If you for example want the database
   * icon, you must return 'database' here. This will result in the classname
   * 'fas fa-database'.
   */
  getIconClass() {
    return null
  }

  /**
   * A human readable name of the application type.
   */
  getName() {
    return null
  }

  /**
   * Must return the route name where the application can navigate to when the
   * application is selected.
   */
  getRouteName() {
    return null
  }

  /**
   * The form component that will be rendered when creating a new instance of
   * this application. By default the ApplicationForm component is returned, but
   * this only contains a name field. If custom fields are required upon
   * creating they can be added with this component.
   */
  getApplicationFormComponent() {
    return ApplicationForm
  }

  /**
   * The sidebar component that will be rendered when an application instance
   * is selected. By default no component will rendered. This could be used for
   * example to render a list of tables that belong to a database.
   */
  getSelectedSidebarComponent() {
    return null
  }

  /**
   * A user can open a small context menu related to the application. He might need
   * this for example for changing the name or to delete the application. Optionally
   * extra options can be added unique per application type by providing a component
   * that will be added to the context menu.
   */
  getContextComponent() {
    return null
  }

  /**
   * Should return an array where the first element is the describing name of the
   * dependents in singular and the second element in plural. Can be null if there
   * aren't any dependants.
   *
   * Example: ['table', 'tables']
   * Result in singular: There is 1 table
   * Result in plural: There are 2 tables
   */
  getDependentsName() {
    return [null, null]
  }

  /**
   * When deleting or listing an application we might want to give a quick overview
   * which children / dependents there are. This method should return a list
   * containing an object with an id, iconClass and name.
   */
  getDependents() {
    return []
  }

  constructor() {
    super()
    this.type = this.getType()
    this.iconClass = this.getIconClass()
    this.name = this.getName()
    this.routeName = this.getRouteName()

    if (this.type === null) {
      throw new Error('The type name of an application type must be set.')
    }
    if (this.iconClass === null) {
      throw new Error('The icon class of an application type must be set.')
    }
    if (this.name === null) {
      throw new Error('The name of an application type must be set.')
    }
  }

  /**
   * @return object
   */
  serialize() {
    return {
      type: this.type,
      iconClass: this.iconClass,
      name: this.name,
      routeName: this.routeName,
      hasSelectedSidebarComponent: this.getSelectedSidebarComponent() !== null,
    }
  }

  /**
   * Every time a fresh application object is fetched from the backend, it will
   * be populated, this is the moment to update some values. Because each
   * application can have unique properties, they might need to be populated.
   * This method can be overwritten in order the populate the correct values.
   */
  populate(application) {
    return application
  }

  /**
   * When an application is deleted it could be that an action should be taken,
   * like redirect the user to another page. This method is called when application
   * of this type is deleted.
   */
  delete(application, context) {}

  /**
   * When an application is selected, for example from the dashboard, an action needs to
   * be taken. For example when a database is selected the user will be redirected to
   * the first table of that database.
   */
  select(application, context) {}

  /**
   *
   */
  clearChildrenSelected(application) {}

  /**
   * Before the application values are updated, they can be modified here. This
   * might be needed because providing certain values could break the update.
   */
  prepareForStoreUpdate(application, data) {}
}
