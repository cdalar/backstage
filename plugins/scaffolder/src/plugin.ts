/*
 * Copyright 2020 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { scmIntegrationsApiRef } from '@backstage/integration-react';
import { scaffolderApiRef, ScaffolderClient } from './api';
import {
  EntityPicker,
  EntityPickerSchema,
} from './components/fields/EntityPicker/EntityPicker';
import { entityNamePickerValidation } from './components/fields/EntityNamePicker';
import {
  EntityNamePicker,
  EntityNamePickerSchema,
} from './components/fields/EntityNamePicker/EntityNamePicker';
import {
  OwnerPicker,
  OwnerPickerSchema,
} from './components/fields/OwnerPicker/OwnerPicker';
import { repoPickerValidation } from './components/fields/RepoUrlPicker';
import {
  RepoUrlPicker,
  RepoUrlPickerSchema,
} from './components/fields/RepoUrlPicker/RepoUrlPicker';
import { createScaffolderFieldExtension } from './extensions';
import {
  nextRouteRef,
  registerComponentRouteRef,
  rootRouteRef,
  viewTechDocRouteRef,
} from './routes';
import {
  createApiFactory,
  createPlugin,
  createRoutableExtension,
  discoveryApiRef,
  fetchApiRef,
  identityApiRef,
} from '@backstage/core-plugin-api';
import {
  OwnedEntityPicker,
  OwnedEntityPickerSchema,
} from './components/fields/OwnedEntityPicker/OwnedEntityPicker';
import {
  EntityTagsPicker,
  EntityTagsPickerSchema,
} from './components/fields/EntityTagsPicker/EntityTagsPicker';

/**
 * The main plugin export for the scaffolder.
 * @public
 */
export const scaffolderPlugin = createPlugin({
  id: 'scaffolder',
  apis: [
    createApiFactory({
      api: scaffolderApiRef,
      deps: {
        discoveryApi: discoveryApiRef,
        scmIntegrationsApi: scmIntegrationsApiRef,
        fetchApi: fetchApiRef,
        identityApi: identityApiRef,
      },
      factory: ({ discoveryApi, scmIntegrationsApi, fetchApi, identityApi }) =>
        new ScaffolderClient({
          discoveryApi,
          scmIntegrationsApi,
          fetchApi,
          identityApi,
        }),
    }),
  ],
  routes: {
    root: rootRouteRef,
  },
  externalRoutes: {
    registerComponent: registerComponentRouteRef,
    viewTechDoc: viewTechDocRouteRef,
  },
});

/**
 * A field extension for selecting an Entity that exists in the Catalog.
 *
 * @public
 */
export const EntityPickerFieldExtension = scaffolderPlugin.provide(
  createScaffolderFieldExtension({
    component: EntityPicker,
    name: 'EntityPicker',
    schema: EntityPickerSchema,
  }),
);

/**
 * The field extension for selecting a name for a new Entity in the Catalog.
 *
 * @public
 */
export const EntityNamePickerFieldExtension = scaffolderPlugin.provide(
  createScaffolderFieldExtension({
    component: EntityNamePicker,
    name: 'EntityNamePicker',
    validation: entityNamePickerValidation,
    schema: EntityNamePickerSchema,
  }),
);

/**
 * The field extension which provides the ability to select a RepositoryUrl.
 * Currently this is an encoded URL that looks something like the following `github.com?repo=myRepoName&owner=backstage`.
 *
 * @public
 */
export const RepoUrlPickerFieldExtension = scaffolderPlugin.provide(
  createScaffolderFieldExtension({
    component: RepoUrlPicker,
    name: 'RepoUrlPicker',
    validation: repoPickerValidation,
    schema: RepoUrlPickerSchema,
  }),
);

/**
 * A field extension for picking users and groups out of the Catalog.
 *
 * @public
 */
export const OwnerPickerFieldExtension = scaffolderPlugin.provide(
  createScaffolderFieldExtension({
    component: OwnerPicker,
    name: 'OwnerPicker',
    schema: OwnerPickerSchema,
  }),
);

/**
 * The Router and main entrypoint to the Scaffolder plugin.
 *
 * @public
 */
export const ScaffolderPage = scaffolderPlugin.provide(
  createRoutableExtension({
    name: 'ScaffolderPage',
    component: () => import('./components/Router').then(m => m.Router),
    mountPoint: rootRouteRef,
  }),
);

/**
 * A field extension to show all the Entities that are owned by the current logged-in User for use in templates.
 *
 * @public
 */
export const OwnedEntityPickerFieldExtension = scaffolderPlugin.provide(
  createScaffolderFieldExtension({
    component: OwnedEntityPicker,
    name: 'OwnedEntityPicker',
    schema: OwnedEntityPickerSchema,
  }),
);

/**
 * EntityTagsPickerFieldExtension
 * @public
 */
export const EntityTagsPickerFieldExtension = scaffolderPlugin.provide(
  createScaffolderFieldExtension({
    component: EntityTagsPicker,
    name: 'EntityTagsPicker',
    schema: EntityTagsPickerSchema,
  }),
);

/**
 * @alpha
 * The Router and main entrypoint to the Alpha Scaffolder plugin.
 */
export const NextScaffolderPage = scaffolderPlugin.provide(
  createRoutableExtension({
    name: 'NextScaffolderPage',
    component: () => import('./next/Router').then(m => m.Router),
    mountPoint: nextRouteRef,
  }),
);
