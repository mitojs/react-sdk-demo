import { BaseClient } from '@mitojs/core';
import { ComponentType } from 'react';
import { Context } from 'react';
import { FC } from 'react';
import { ReactNode } from 'react';

export declare const ErrorBoundary: FC<ErrorBoundaryProps & {
    children: ReactNode;
}>;

declare interface ErrorBoundaryProps {
    fallback?: ReactNode;
    onError?: (error: Error, componentStack: string) => void;
    MitoInstance?: BaseClient;
}

export declare const MitoContext: Context<MitoContextValueType>;

declare interface MitoContextValueType {
    MitoInstance: BaseClient;
}

export declare const MitoProvider: FC<MitoContextValueType>;

export declare const WithErrorBoundary: (errorBoundaryProps?: ErrorBoundaryProps) => <C extends ComponentType<{}>>(ToWrapComponent: C) => C;

export { }
