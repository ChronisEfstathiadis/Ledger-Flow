/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { WalletsController } from './../controllers/wallets.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { WalletMembersController } from './../controllers/wallet-members.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UsersController } from './../controllers/users.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { InvitesController } from './../controllers/invites.controller';
import { expressAuthentication } from './../auth/authentication';
// @ts-ignore - no great way to install types from subpackage
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';

const expressAuthenticationRecasted = expressAuthentication as (req: ExRequest, securityName: string, scopes?: string[], res?: ExResponse) => Promise<any>;


// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "WalletDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "currency": {"dataType":"string","required":true},
            "createdAt": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateWalletBody": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "currency": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_CreateWalletBody_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string"},"currency":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateWalletBody": {
        "dataType": "refAlias",
        "type": {"ref":"Partial_CreateWalletBody_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WalletMemberDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "role": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WalletInviteDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "walletId": {"dataType":"string","required":true},
            "inviterId": {"dataType":"string","required":true},
            "inviteeEmail": {"dataType":"string","required":true},
            "token": {"dataType":"string","required":true},
            "status": {"dataType":"string","required":true},
            "expiresAt": {"dataType":"datetime","required":true},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateInviteBody": {
        "dataType": "refObject",
        "properties": {
            "inviteeEmail": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "auth0Id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateUserBody": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "email": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WalletMemberLinkDto": {
        "dataType": "refObject",
        "properties": {
            "userId": {"dataType":"string","required":true},
            "walletId": {"dataType":"string","required":true},
            "role": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsWalletsController_create: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"CreateWalletBody"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/api/wallets',
            authenticateMiddleware([{"sessionCookie":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WalletsController)),
            ...(fetchMiddlewares<RequestHandler>(WalletsController.prototype.create)),

            async function WalletsController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsWalletsController_create, request, response });

                const controller = new WalletsController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsWalletsController_getById: Record<string, TsoaRoute.ParameterSchema> = {
                walletId: {"in":"path","name":"walletId","required":true,"dataType":"string"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/api/wallets/:walletId',
            authenticateMiddleware([{"sessionCookie":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WalletsController)),
            ...(fetchMiddlewares<RequestHandler>(WalletsController.prototype.getById)),

            async function WalletsController_getById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsWalletsController_getById, request, response });

                const controller = new WalletsController();

              await templateService.apiHandler({
                methodName: 'getById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsWalletsController_update: Record<string, TsoaRoute.ParameterSchema> = {
                walletId: {"in":"path","name":"walletId","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"ref":"UpdateWalletBody"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.put('/api/wallets/:walletId',
            authenticateMiddleware([{"sessionCookie":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WalletsController)),
            ...(fetchMiddlewares<RequestHandler>(WalletsController.prototype.update)),

            async function WalletsController_update(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsWalletsController_update, request, response });

                const controller = new WalletsController();

              await templateService.apiHandler({
                methodName: 'update',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsWalletsController_remove: Record<string, TsoaRoute.ParameterSchema> = {
                walletId: {"in":"path","name":"walletId","required":true,"dataType":"string"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.delete('/api/wallets/:walletId',
            authenticateMiddleware([{"sessionCookie":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WalletsController)),
            ...(fetchMiddlewares<RequestHandler>(WalletsController.prototype.remove)),

            async function WalletsController_remove(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsWalletsController_remove, request, response });

                const controller = new WalletsController();

              await templateService.apiHandler({
                methodName: 'remove',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsWalletsController_list: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/api/wallets',
            authenticateMiddleware([{"sessionCookie":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WalletsController)),
            ...(fetchMiddlewares<RequestHandler>(WalletsController.prototype.list)),

            async function WalletsController_list(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsWalletsController_list, request, response });

                const controller = new WalletsController();

              await templateService.apiHandler({
                methodName: 'list',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsWalletMembersController_listMembers: Record<string, TsoaRoute.ParameterSchema> = {
                walletId: {"in":"path","name":"walletId","required":true,"dataType":"string"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/api/wallets/:walletId/members',
            authenticateMiddleware([{"sessionCookie":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WalletMembersController)),
            ...(fetchMiddlewares<RequestHandler>(WalletMembersController.prototype.listMembers)),

            async function WalletMembersController_listMembers(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsWalletMembersController_listMembers, request, response });

                const controller = new WalletMembersController();

              await templateService.apiHandler({
                methodName: 'listMembers',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsWalletMembersController_createWalletInvite: Record<string, TsoaRoute.ParameterSchema> = {
                walletId: {"in":"path","name":"walletId","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"ref":"CreateInviteBody"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/api/wallets/:walletId/invites',
            authenticateMiddleware([{"sessionCookie":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WalletMembersController)),
            ...(fetchMiddlewares<RequestHandler>(WalletMembersController.prototype.createWalletInvite)),

            async function WalletMembersController_createWalletInvite(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsWalletMembersController_createWalletInvite, request, response });

                const controller = new WalletMembersController();

              await templateService.apiHandler({
                methodName: 'createWalletInvite',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsWalletMembersController_listWalletInvites: Record<string, TsoaRoute.ParameterSchema> = {
                walletId: {"in":"path","name":"walletId","required":true,"dataType":"string"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/api/wallets/:walletId/invites',
            authenticateMiddleware([{"sessionCookie":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WalletMembersController)),
            ...(fetchMiddlewares<RequestHandler>(WalletMembersController.prototype.listWalletInvites)),

            async function WalletMembersController_listWalletInvites(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsWalletMembersController_listWalletInvites, request, response });

                const controller = new WalletMembersController();

              await templateService.apiHandler({
                methodName: 'listWalletInvites',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsWalletMembersController_revokeWalletInvite: Record<string, TsoaRoute.ParameterSchema> = {
                walletId: {"in":"path","name":"walletId","required":true,"dataType":"string"},
                inviteId: {"in":"path","name":"inviteId","required":true,"dataType":"string"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.delete('/api/wallets/:walletId/invites/:inviteId',
            authenticateMiddleware([{"sessionCookie":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WalletMembersController)),
            ...(fetchMiddlewares<RequestHandler>(WalletMembersController.prototype.revokeWalletInvite)),

            async function WalletMembersController_revokeWalletInvite(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsWalletMembersController_revokeWalletInvite, request, response });

                const controller = new WalletMembersController();

              await templateService.apiHandler({
                methodName: 'revokeWalletInvite',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsWalletMembersController_removeWalletMember: Record<string, TsoaRoute.ParameterSchema> = {
                walletId: {"in":"path","name":"walletId","required":true,"dataType":"string"},
                userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.delete('/api/wallets/:walletId/members/:userId',
            authenticateMiddleware([{"sessionCookie":[]}]),
            ...(fetchMiddlewares<RequestHandler>(WalletMembersController)),
            ...(fetchMiddlewares<RequestHandler>(WalletMembersController.prototype.removeWalletMember)),

            async function WalletMembersController_removeWalletMember(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsWalletMembersController_removeWalletMember, request, response });

                const controller = new WalletMembersController();

              await templateService.apiHandler({
                methodName: 'removeWalletMember',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUsersController_sync: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/api/users/me',
            ...(fetchMiddlewares<RequestHandler>(UsersController)),
            ...(fetchMiddlewares<RequestHandler>(UsersController.prototype.sync)),

            async function UsersController_sync(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsersController_sync, request, response });

                const controller = new UsersController();

              await templateService.apiHandler({
                methodName: 'sync',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUsersController_getMe: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/api/users/me',
            authenticateMiddleware([{"sessionCookie":[]}]),
            ...(fetchMiddlewares<RequestHandler>(UsersController)),
            ...(fetchMiddlewares<RequestHandler>(UsersController.prototype.getMe)),

            async function UsersController_getMe(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsersController_getMe, request, response });

                const controller = new UsersController();

              await templateService.apiHandler({
                methodName: 'getMe',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUsersController_updateMe: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"UpdateUserBody"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.put('/api/users/me',
            authenticateMiddleware([{"sessionCookie":[]}]),
            ...(fetchMiddlewares<RequestHandler>(UsersController)),
            ...(fetchMiddlewares<RequestHandler>(UsersController.prototype.updateMe)),

            async function UsersController_updateMe(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsersController_updateMe, request, response });

                const controller = new UsersController();

              await templateService.apiHandler({
                methodName: 'updateMe',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsInvitesController_listMyInvites: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/api/invites/mine',
            authenticateMiddleware([{"sessionCookie":[]}]),
            ...(fetchMiddlewares<RequestHandler>(InvitesController)),
            ...(fetchMiddlewares<RequestHandler>(InvitesController.prototype.listMyInvites)),

            async function InvitesController_listMyInvites(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInvitesController_listMyInvites, request, response });

                const controller = new InvitesController();

              await templateService.apiHandler({
                methodName: 'listMyInvites',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsInvitesController_acceptWalletInvite: Record<string, TsoaRoute.ParameterSchema> = {
                token: {"in":"path","name":"token","required":true,"dataType":"string"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/api/invites/:token/accept',
            authenticateMiddleware([{"sessionCookie":[]}]),
            ...(fetchMiddlewares<RequestHandler>(InvitesController)),
            ...(fetchMiddlewares<RequestHandler>(InvitesController.prototype.acceptWalletInvite)),

            async function InvitesController_acceptWalletInvite(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInvitesController_acceptWalletInvite, request, response });

                const controller = new InvitesController();

              await templateService.apiHandler({
                methodName: 'acceptWalletInvite',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsInvitesController_declineWalletInvite: Record<string, TsoaRoute.ParameterSchema> = {
                token: {"in":"path","name":"token","required":true,"dataType":"string"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/api/invites/:token/decline',
            authenticateMiddleware([{"sessionCookie":[]}]),
            ...(fetchMiddlewares<RequestHandler>(InvitesController)),
            ...(fetchMiddlewares<RequestHandler>(InvitesController.prototype.declineWalletInvite)),

            async function InvitesController_declineWalletInvite(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInvitesController_declineWalletInvite, request, response });

                const controller = new InvitesController();

              await templateService.apiHandler({
                methodName: 'declineWalletInvite',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async function runAuthenticationMiddleware(request: any, response: any, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts: any[] = [];
            const pushAndRethrow = (error: any) => {
                failedAttempts.push(error);
                throw error;
            };

            const secMethodOrPromises: Promise<any>[] = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        secMethodAndPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }

                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                } else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            try {
                request['user'] = await Promise.any(secMethodOrPromises);

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }

                next();
            }
            catch(err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }
                next(error);
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
