import { given } from "@nivinjoseph/n-defensive";


export interface Observable<T>
{
    subscribe(onChange: (val: T) => any): Subscription;
}


export interface Subscription
{
    unsubscribe(): void;
}


class SubscriptionInternal<T> implements Subscription
{
    private readonly _observation: Observation<T>;
    private readonly _func: (val: T) => any;
    private _unsubscribed = false;


    public constructor(observation: Observation<T>, func: (val: T) => any)
    {
        given(observation, "observation").ensureHasValue().ensureIsObject();
        this._observation = observation;
        
        given(func, "func").ensureHasValue().ensureIsFunction();
        this._func = func;
    }

    public push(value: any): void
    {
        this._func(value);
    }

    public unsubscribe(): void
    {
        if (this._unsubscribed)
            return;
        
        this._observation.removeSubscription(this);
        this._unsubscribed = false;
    }
}


export class Observation<T> implements Observable<Readonly<T>>
{
    private readonly _subscriptions = new Set<SubscriptionInternal<T>>();
    private _value: T;
    
    
    public get value(): Readonly<T> { return this._value; }
    
    
    public constructor(initialValue: T)
    {
        this._value = initialValue;
    }
    
    public subscribe(onChange: (val: T) => any): Subscription
    {    
        given(onChange, "onChange").ensureHasValue().ensureIsFunction();
        
        const subscription = new SubscriptionInternal<T>(this, onChange);
        this._subscriptions.add(subscription);
        subscription.push(this._value);
        return subscription;
    }
    
    
    public change(value: T): void
    {
        this._value = value;
        this._subscriptions.forEach(t => t.push(this._value));
    }
    
    public removeSubscription(subscription: SubscriptionInternal<T>): void
    {
        given(subscription, "subscription").ensureHasValue().ensureIsObject().ensureIsType(SubscriptionInternal);
        
        if (this._subscriptions.has(subscription))
            this._subscriptions.delete(subscription);
    }
}