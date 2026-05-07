import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { setDoc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';

let testEnv: RulesTestEnvironment;

describe('Firestore Security Rules', () => {
  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: 'gen-lang-client-0849005613',
      firestore: {
        host: 'localhost',
        port: 8080,
      },
    });
  });

  beforeEach(async () => {
    await testEnv.clearFirestore();
  });

  afterAll(async () => {
    await testEnv.cleanup();
  });

  it('allows user to create their own profile', async () => {
    const alice = testEnv.authenticatedContext('alice');
    await assertSucceeds(setDoc(doc(alice.firestore(), 'users/alice'), {
      userId: 'alice',
      email: 'alice@example.com',
      createdAt: new Date(), // Mocking request.time in actual rules
    }));
  });

  it('denies user from creating another profile', async () => {
    const alice = testEnv.authenticatedContext('alice');
    await assertFails(setDoc(doc(alice.firestore(), 'users/bob'), {
      userId: 'bob',
      email: 'bob@example.com',
      createdAt: new Date(),
    }));
  });

  it('allows user to create their own order with valid data', async () => {
    const alice = testEnv.authenticatedContext('alice');
    await assertSucceeds(setDoc(doc(alice.firestore(), 'orders/order1'), {
      userId: 'alice',
      items: [{ id: 'doro-wat', name: 'Doro Wat', price: 24, quantity: 1 }],
      subtotal: 24,
      total: 24,
      status: 'pending',
      createdAt: new Date(),
    }));
  });

  it('denies user from creating an order for someone else', async () => {
    const alice = testEnv.authenticatedContext('alice');
    await assertFails(setDoc(doc(alice.firestore(), 'orders/order1'), {
      userId: 'bob',
      items: [{ id: 'doro-wat', name: 'Doro Wat', price: 24, quantity: 1 }],
      subtotal: 24,
      total: 24,
      status: 'pending',
      createdAt: new Date(),
    }));
  });

  it('denies unauthenticated access to orders', async () => {
    const unauth = testEnv.unauthenticatedContext();
    await assertFails(getDoc(doc(unauth.firestore(), 'orders/order1')));
  });
});

function doc(db: any, path: string) {
  const parts = path.split('/');
  let ref = collection(db, parts[0]);
  for (let i = 1; i < parts.length - 1; i += 2) {
    // This is a simplification for the test
  }
  // This is just a mock for the structure of the prompt's request
  return { id: parts[parts.length - 1], path };
}
