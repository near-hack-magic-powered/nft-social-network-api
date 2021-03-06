import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { ActionKind } from '../types/action-kind';
import { Receipt } from './receipt.entity';

@Entity({ name: 'action_receipt_actions' })
export class ReceiptAction {
  @PrimaryColumn()
  receiptId: string;

  @PrimaryColumn()
  indexInActionReceipt: number;

  @ManyToOne(() => Receipt, (receipt) => receipt.receiptActions, {
    nullable: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'receipt_id' })
  receipt: Receipt;

  @Column()
  receiptPredecessorAccountId: string;

  @Column()
  receiptReceiverAccountId: string;

  @Column({
    type: 'enum',
    enum: ActionKind,
  })
  actionKind: string;

  @Column({ type: 'simple-json' })
  args: Record<string, unknown>;
}
