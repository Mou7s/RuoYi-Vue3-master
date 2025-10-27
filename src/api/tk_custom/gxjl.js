import request from '@/utils/request'


export function queryByBillNo(query) {
    return request({
        url: '/kingdee/gxjh/OP011464',
        method: 'get',
        params: query
    })
}
//保存
export function save(data) {
    return request({
        url: '/kingdee/save_gxhb',
        method: 'post',
        params: data
    })
}
// 扫码新增
export function simpleAddVisit(data) {
    return request({
        url: '/tk_custom/visit/simpleAdd',
        method: 'post',
        data: data
    })
}
//工序计划
export function getObj_gxjh() {
    //SFC_OperationPlanning
    return {
        "NeedUpDateFields": [],
        "NeedReturnFields": [],
        "IsDeleteEntry": "true",
        "SubSystemId": "",
        "IsVerifyBaseDataField": "false",
        "IsEntryBatchFill": "true",
        "ValidateFlag": "true",
        "NumberSearch": "true",
        "IsAutoAdjustField": "true",
        "InterationFlags": "",
        "IgnoreInterationFlag": "",
        "IsControlPrecision": "false",
        "ValidateRepeatJson": "false",
        "Model": {
            "FID": 0,
            "FProductId": {
                "FNUMBER": ""
            },
            "FAuxPropId": {
                "FAUXPROPID__FF100001": {
                    "FNumber": ""
                },
                "FAUXPROPID__FF100002": {
                    "FNumber": ""
                },
                "FAUXPROPID__FF100003": {
                    "FNumber": ""
                },
                "FAUXPROPID__FF100004": {
                    "FNumber": ""
                },
                "FAUXPROPID__FF100005": {
                    "FNumber": ""
                },
                "FAUXPROPID__FF100006": {
                    "FNumber": ""
                },
                "FAUXPROPID__FF100007": {
                    "FNumber": ""
                },
                "FAUXPROPID__FF100008": {
                    "FNumber": ""
                },
                "FAUXPROPID__FF100009": {
                    "FNumber": ""
                },
                "FAUXPROPID__FF100010": {
                    "FNumber": ""
                },
                "FAUXPROPID__FF100011": {
                    "FNumber": ""
                },
                "FAUXPROPID__FF100012": {
                    "FNumber": ""
                },
                "FAUXPROPID__FF100013": {
                    "FNumber": ""
                },
                "FAUXPROPID__FF100014": {
                    "FNumber": ""
                },
                "FAUXPROPID__FF100015": {
                    "FNumber": ""
                },
                "FAUXPROPID__FF100027": {
                    "FNumber": ""
                },
                "FAUXPROPID__FF100018": {
                    "FNumber": ""
                },
                "FAUXPROPID__FF100021": {
                    "FNumber": ""
                },
                "FAUXPROPID__FF100025": {
                    "FNumber": ""
                },
                "FAUXPROPID__FF100029": {
                    "FNumber": ""
                },
                "FAUXPROPID__FF100026": {
                    "FNumber": ""
                },
                "FAUXPROPID__FF100024": {
                    "FNumber": ""
                },
                "FAUXPROPID__FF100017": {
                    "FNumber": ""
                }
            },
            "FProOrgId": {
                "FNumber": ""
            },
            "FProDepartmentId": {
                "FNUMBER": ""
            },
            "FRouteId": {
                "FNUMBER": ""
            },
            "FBillType": {
                "FNUMBER": ""
            },
            "FPlanStartTime": "1900-01-01",
            "FPlanFinishTime": "1900-01-01",
            "FScheduleModelId": {
                "FNUMBER": ""
            },
            "FMONumber": "",
            "FMOEntrySeq": 0,
            "FMOUnitId": {
                "FNumber": ""
            },
            "FMOQty": 0,
            "FDescription": "",
            "FBomId": {
                "FNUMBER": ""
            },
            "FMTONo": "",
            "FLot": {
                "FNumber": ""
            },
            "FSaleOrderNumber": "",
            "FSaleOrderEntrySeq": 0,
            "FBFLowId": {
                "FName": ""
            },
            "FProductType": "",
            "FStockInOrgId": {
                "FNumber": ""
            },
            "FOwnerTypeId": "",
            "FOwnerId": {
                "FNumber": ""
            },
            "FMOId": 0,
            "FMOEntryId": 0,
            "FBaseUnitId": {
                "FNumber": ""
            },
            "FBaseQty": 0,
            "FProjectNo": "",
            "FIsEntrust": "false",
            "FPrintTimes": 0,
            "FPrintDateTime": "1900-01-01",
            "FPlanType": "",
            "FParentId": 0,
            "FRootBillId": 0,
            "FSourceBillType": "",
            "FSourceBillNo": "",
            "FDemandBillId": 0,
            "FDemandBillEntryId": 0,
            "FDemandType": "",
            "FProduceType": "",
            "FScheduleSeq": 0,
            "FProductLine": {
                "FNUMBER": ""
            },
            "FAutoInStore": "",
            "FProcessCheckSchemaId": {
                "FNUMBER": ""
            },
            "FInspectCheckSchemaId": {
                "FNUMBER": ""
            },
            "FFailAutoInStore": "",
            "FOutSrcWay": "",
            "FDecuctionTime": "",
            "FIsWastageInStock": "false",
            "FIsDelayAudit": "false",
            "FCustId": {
                "FNUMBER": ""
            },
            "F_UNW_Assistant_83g": {
                "FNumber": ""
            },
            "F_UNW_Text_w5c": "",
            "F_ZBMY_Assistant_fg2_yrr": {
                "FNumber": ""
            },
            "F_ZBMY_Assistant_fg2_h1g": {
                "FNumber": ""
            },
            "F_UNW_Text_re5": "",
            "F_UNW_Text_83g": "",
            "F_ZBMY_Assistant_fg2": {
                "FNumber": ""
            },
            "F_UNW_Date_uky": "1900-01-01",
            "F_UNW_Text_w5c1": "",
            "F_UNW_Qty_fg2": 0,
            "F_UNW_Qty_imu": 0,
            "F_UNW_Text_c1c": "",
            "F_UNW_Text_hsj": "",
            "F_UNW_Text_jdx": "",
            "F_UNW_Decimal_re5": 0,
            "F_UNW_Decimal_apv": 0,
            "F_UNW_Text_qtr": "",
            "F_UNW_Base_tzk": {
                "FNUMBER": ""
            },
            "F_UNW_Base_zc5": {
                "FNUMBER": ""
            },
            "F_UNW_Combo_apv": "",
            "F_UNW_Text_re51": "",
            "F_UNW_Base_apv": {
                "FNUMBER": ""
            },
            "F_UNW_Base_re5": {
                "FNUMBER": ""
            },
            "F_UNW_Text_apv": "",
            "FEntity": [
                {
                    "FEntryID": 0,
                    "FSeqNumber": "",
                    "FSeqName": "",
                    "FSeqType": "",
                    "FSeqAlignment": "",
                    "FSeqRefer": "",
                    "FSeqOut": 0,
                    "FSeqIn": 0,
                    "FSeqQty": 0,
                    "FSeqPlanStartTime": "1900-01-01",
                    "FSeqPlanFinishTime": "1900-01-01",
                    "FSeqSrcType": "",
                    "FSeqSrcEntryId": 0,
                    "FRptWriteBackQty": 0,
                    "FRptWriteBackBaseQty": 0,
                    "FSrcEntityId": 0,
                    "FSchMainSeq": "false",
                    "FSplitFromOper": 0,
                    "FSplitToOper": 0,
                    "FSplitQty": 0,
                    "FSeqWorkCenterId": {
                        "FNUMBER": ""
                    },
                    "FSubEntity": [
                        {
                            "FDetailID": 0,
                            "FOperNumber": 0,
                            "FProcessOrgId": {
                                "FNumber": ""
                            },
                            "FWorkCenterId": {
                                "FNUMBER": ""
                            },
                            "FDepartmentId": {
                                "FNUMBER": ""
                            },
                            "FProcessId": {
                                "FNUMBER": ""
                            },
                            "FOperDescription": "",
                            "FOptCtrlCodeId": {
                                "FNUMBER": ""
                            },
                            "FScanFeatureCode": "",
                            "FIsOutSrc": "false",
                            "FOperUnitId": {
                                "FNumber": ""
                            },
                            "FQualifiedQty": 0,
                            "FUnqualifiedQty": 0,
                            "FWastageQty": 0,
                            "FTransOutQty": 0,
                            "FKeyOper": "",
                            "FOperQty": 0,
                            "FTransInQty": 0,
                            "FMOBaseUnitId": {
                                "FNumber": ""
                            },
                            "FOperHeadBaseQty": 0,
                            "FOperMOUnitId": {
                                "FNumber": ""
                            },
                            "FOperHeadQty": 0,
                            "FBaseBatch": 0,
                            "FUnitTransHeadQty": 0,
                            "FUnitTransOperQty": 0,
                            "FRejectionRate": 0,
                            "FOperPlanStartTime": "1900-01-01",
                            "FOperPlanFinishTime": "1900-01-01",
                            "FOperFirstStartTime": "1900-01-01",
                            "FOperFirstFinishTime": "1900-01-01",
                            "FOperLastStartTime": "1900-01-01",
                            "FOperLastFinishTime": "1900-01-01",
                            "FActivity1Id": {
                                "FNUMBER": ""
                            },
                            "FActivity1Qty": 0,
                            "FActivity1ReportQty": 0,
                            "FActivity1BaseQty": 0,
                            "FActivity1UnitId": {
                                "FNumber": ""
                            },
                            "FActivity1FormulaId": {
                                "FNUMBER": ""
                            },
                            "FActivity1RepFormulaId": {
                                "FNUMBER": ""
                            },
                            "FActivity2Id": {
                                "FNUMBER": ""
                            },
                            "FActivity2UnitId": {
                                "FNumber": ""
                            },
                            "FActivity2Qty": 0,
                            "FActivity2ReportQty": 0,
                            "FActivity2BaseQty": 0,
                            "FActivity2FormulaId": {
                                "FNUMBER": ""
                            },
                            "FActivity2RepFormulaId": {
                                "FNUMBER": ""
                            },
                            "FActivity3Id": {
                                "FNUMBER": ""
                            },
                            "FActivity3UnitId": {
                                "FNumber": ""
                            },
                            "FActivity3Qty": 0,
                            "FActivity3ReportQty": 0,
                            "FActivity3BaseQty": 0,
                            "FActivity3FormulaId": {
                                "FNUMBER": ""
                            },
                            "FActivity3RepFormulaId": {
                                "FNUMBER": ""
                            },
                            "FActivity4Id": {
                                "FNUMBER": ""
                            },
                            "FActivity4UnitId": {
                                "FNumber": ""
                            },
                            "FActivity4Qty": 0,
                            "FActivity4ReportQty": 0,
                            "FActivity4BaseQty": 0,
                            "FActivity4FormulaId": {
                                "FNUMBER": ""
                            },
                            "FActivity4RepFormulaId": {
                                "FNUMBER": ""
                            },
                            "FActivity5Id": {
                                "FNUMBER": ""
                            },
                            "FActivity5UnitId": {
                                "FNumber": ""
                            },
                            "FActivity5Qty": 0,
                            "FActivity5ReportQty": 0,
                            "FActivity5BaseQty": 0,
                            "FActivity5FormulaId": {
                                "FNUMBER": ""
                            },
                            "FActivity5RepFormulaId": {
                                "FNUMBER": ""
                            },
                            "FActivity6Id": {
                                "FNUMBER": ""
                            },
                            "FActivity6UnitId": {
                                "FNumber": ""
                            },
                            "FActivity6Qty": 0,
                            "FActivity6ReportQty": 0,
                            "FActivity6BaseQty": 0,
                            "FActivity6FormulaId": {
                                "FNUMBER": ""
                            },
                            "FActivity6RepFormulaId": {
                                "FNUMBER": ""
                            },
                            "FPrepareStartTime": "1900-01-01",
                            "FPrepareFinishTime": "1900-01-01",
                            "FPrepareWorkTime": 0,
                            "FPrepareUnit": "",
                            "FProcessStartTime": "1900-01-01",
                            "FProcessFinishTime": "1900-01-01",
                            "FProcessWorkTime": 0,
                            "FProcessRemainWorkTime": 0,
                            "FProcessUnit": "",
                            "FRemoveStartTime": "1900-01-01",
                            "FRemoveFinishTime": "1900-01-01",
                            "FRemoveWorkTime": 0,
                            "FRemoveRemainWorkTime": 0,
                            "FRemoveUnit": "",
                            "FBetweenStartTime": "1900-01-01",
                            "FBetweenFinishTime": "1900-01-01",
                            "FBetweenWorkTime": 0,
                            "FBetweenUnit": "",
                            "FLeadTime": 0,
                            "FOffsetTime": 0,
                            "FIsSplitSchedule": "false",
                            "FRealSplitQty": 0,
                            "FAdviceSplitQty": 0,
                            "FSplitMinWorkTime": 0,
                            "FSplitMinWorkTimeUnit": "",
                            "FIsIteration": "false",
                            "FIterationMinTime": 0,
                            "FIterationMinTimeUnit": "",
                            "FIterationMinBatch": 0,
                            "FIsSameTime": "false",
                            "FStdQueueTime": 0,
                            "FStdQueueTimeUnit": "",
                            "FMinQueueTime": 0,
                            "FMinQueueTimeUnit": "",
                            "FStdWaitTime": 0,
                            "FStdWaitTimeUnit": "",
                            "FMinWaitTime": 0,
                            "FMinWaitTimeUnit": "",
                            "FStdMoveTime": 0,
                            "FStdMoveTimeUnit": "",
                            "FMinMoveTime": 0,
                            "FMinMoveTimeUnit": "",
                            "FPurchaseOrgId": {
                                "FNumber": ""
                            },
                            "FPurchaseGroupId": {
                                "FNUMBER": ""
                            },
                            "FOutSrcLeadTime": 0,
                            "FSupplier": {
                                "FNUMBER": ""
                            },
                            "FPriceList": {
                                "FNUMBER": ""
                            },
                            "FOutSrcCurrency": {
                                "FNUMBER": ""
                            },
                            "FOutSrcPrice": 0,
                            "FValuationUnitId": {
                                "FNumber": ""
                            },
                            "FValuationQty": 0,
                            "FRateOperQty": 0,
                            "FRateValQty": 0,
                            "FReportQty": 0,
                            "FReportBaseQty": 0,
                            "FReportHeadQty": 0,
                            "FQualifiedBaseQty": 0,
                            "FQualifiedHeadQty": 0,
                            "FUnqualifiedBaseQty": 0,
                            "FUnqualifiedHeadQty": 0,
                            "FFinishLowerLimit": 0,
                            "FOperAlterNumber": "",
                            "FOperAlterEntrySeq": 0,
                            "FRealPrepareStartTime": "1900-01-01",
                            "FRealPrepareFinishTime": "1900-01-01",
                            "FRealProcessStartTime": "1900-01-01",
                            "FRealProcessFinishTime": "1900-01-01",
                            "FRealRemoveStartTime": "1900-01-01",
                            "FRealRemoveFinishTime": "1900-01-01",
                            "FOperSrcType": "",
                            "FTransOutBaseQty": 0,
                            "FOperSrcDetailId": 0,
                            "FTransInBaseQty": 0,
                            "FTransOutHeadQty": 0,
                            "FTransInHeadQty": 0,
                            "FShiftSliceId": {
                                "FNUMBER": ""
                            },
                            "FShiftGroupId": {
                                "FNUMBER": ""
                            },
                            "FResourceId": {
                                "FNUMBER": ""
                            },
                            "FEquipmentId": {
                                "FNUMBER": ""
                            },
                            "FEmpId": [
                                {
                                    "FStaffNumber": ""
                                }
                            ],
                            "FIsFirstOper": "false",
                            "FIsStoreInPoint": "false",
                            "FSrcSubEntityId": 0,
                            "FTransSelQty": 0,
                            "FTransSelHeadQty": 0,
                            "FTransSelBaseQty": 0,
                            "FScrapQty": 0,
                            "FScrapHeadQty": 0,
                            "FScrapBaseQty": 0,
                            "FMatScrapQty": 0,
                            "FMatScrapHeadQty": 0,
                            "FMatScrapBaseQty": 0,
                            "FScrapPrice": 0,
                            "FMatScrapPrice": 0,
                            "FQCSchemeId": {
                                "FNUMBER": ""
                            },
                            "FTaxRate": 0,
                            "FReTransOutQty": 0,
                            "FReTransOutHeadQty": 0,
                            "FReTransOutBaseQty": 0,
                            "FIsLinkageSchedule": "false",
                            "FIsFirstPieceInspect": "false",
                            "FScheduleTime": "",
                            "FInspectStatus": "",
                            "FOperPhase": 0,
                            "FIsFirstOperPhase": "false",
                            "FRateProQty": 0,
                            "FConvertType": "",
                            "FOutSrcTaxPrice": 0,
                            "FScrapTaxPrice": 0,
                            "FMatScrapTaxPrice": 0,
                            "FIPQCOperNumber": 0,
                            "FLockEquipment": "false",
                            "FBarCode": "",
                            "FConveyDate": "1900-01-01",
                            "FSelMoType": "",
                            "FPatrolStatus": "",
                            "FReWorkQty": 0,
                            "FReWorkHeadQty": 0,
                            "FReWorkBaseQty": 0,
                            "FReSelQty": 0,
                            "FReSelHeadQty": 0,
                            "FReSelBaseQty": 0,
                            "FReFinishQty": 0,
                            "FReFinishHeadQty": 0,
                            "FReFinishBaseQty": 0,
                            "FDefectReworkMode": "",
                            "FEnableLocationNo": "false",
                            "FFirstInspectControl": "",
                            "FOperExcessCtrlQty": 0,
                            "FBaseExcessCtrlQty": 0,
                            "FPrdExcessCtrlQty": 0,
                            "FOperResStockQty": 0,
                            "FBaseResStockQty": 0,
                            "FOperCheckDiffQty": 0,
                            "FPrdResStockQty": 0,
                            "FBaseCheckDiffQty": 0,
                            "FIsDiscreteOperDispDetail": "false",
                            "FPrdCheckDiffQty": 0,
                            "FBaseWastageQty": 0,
                            "FPrdWastageQty": 0,
                            "FIsProcessRecordStation": "false",
                            "FOperPickStauts": "",
                            "FIsQualityInspectStation": "false",
                            "FManualAddNew": "false",
                            "FProcessCheckSchemaEntryId": {
                                "FNUMBER": ""
                            },
                            "FMultiEmpName": "",
                            "FInspectCheckSchemaEntryId": {
                                "FNUMBER": ""
                            },
                            "FIsCheckProcessRecord": "false",
                            "FIsCheckProcessInspect": "false",
                            "FIsManualReport": "false",
                            "FIsRptCheckProcessRecord": "false",
                            "FIsRptCheckProcessInspect": "false",
                            "FIsWorkTime": "false",
                            "FPickingQty": 0,
                            "FWorkTimeColect": "",
                            "FWIPQty": 0,
                            "F_UNW_Integer_83g": 0,
                            "FOUTSENDQTY": 0
                        }
                    ]
                }
            ]
        }
    }
}
//工序汇报
export function getObj_gxhb() {
    //SFC_OperationReport
    return {
        "NeedUpDateFields": [],
        "NeedReturnFields": [],
        "IsDeleteEntry": "true",
        "SubSystemId": "",
        "IsVerifyBaseDataField": "false",
        "IsEntryBatchFill": "true",
        "ValidateFlag": "true",
        "NumberSearch": "true",
        "IsAutoAdjustField": "true",
        "InterationFlags": "",
        "IgnoreInterationFlag": "",
        "IsControlPrecision": "false",
        "ValidateRepeatJson": "false",
        "Model": {
            "FID": 0,
            "FPrdOrgId": {
                "FNumber": ""
            },
            "FWorkShopID": {
                "FNUMBER": ""
            },
            "FBillTypeID": {
                "FNUMBER": ""
            },
            "FDate": "1900-01-01",
            "FDescription": "",
            "FIsEntrust": "false",
            "FBoxNumber": "",
            "FBillGenType": "",
            "FTotalRptQty": 0,
            "FIsSynced": "false",
            "FIsDelayAudit": "false",
            "FEntity": [
                {
                    "FENTRYID": 0,
                    "FMoNumber": "",
                    "FMoRowNumber": 0,
                    "FSeqNumber": "",
                    "FOperNumber": 0,
                    "FMaterialId": {
                        "FNUMBER": ""
                    },
                    "FUnitID": {
                        "FNumber": ""
                    },
                    "FQuaQty": 0,
                    "FWastageQty": 0,
                    "FProcessFailQty": 0,
                    "FMaterialFailQty": 0,
                    "FFailQty": 0,
                    "FReworkQty": 0,
                    "FIsReworkRpt": "false",
                    "FFinishQty": 0,
                    "FCheckQty": 0,
                    "FCheckSelQty": 0,
                    "FPrdType": "",
                    "FOperDescription": "",
                    "FReportType": {
                        "FNUMBER": ""
                    },
                    "FAuxPropId": {
                        "FAUXPROPID__FF100001": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100002": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100003": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100004": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100005": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100006": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100007": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100008": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100009": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100010": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100011": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100012": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100013": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100014": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100015": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100027": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100018": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100021": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100025": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100029": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100026": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100024": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100017": {
                            "FNumber": ""
                        }
                    },
                    "FLot": {
                        "FNUMBER": ""
                    },
                    "FConfOptStatus": "",
                    "FOptRemark": "",
                    "FRefOptSeq": "",
                    "FRefOptSeqName": "",
                    "FRefOptNumber": 0,
                    "FRefOptName": "",
                    "FTotalQuaQty": 0,
                    "FTotalFailQty": 0,
                    "FPlanningQty": 0,
                    "FShiftSliceId": {
                        "FNUMBER": ""
                    },
                    "FShiftGroupId": {
                        "FNUMBER": ""
                    },
                    "FResourceId": {
                        "FNUMBER": ""
                    },
                    "FEquipmentId": {
                        "FNUMBER": ""
                    },
                    "FInspector": {
                        "FSTAFFNUMBER": ""
                    },
                    "FActivity1Id": {
                        "FNUMBER": ""
                    },
                    "FActivity2Id": {
                        "FNUMBER": ""
                    },
                    "FActivity3Id": {
                        "FNUMBER": ""
                    },
                    "FActivity4Id": {
                        "FNUMBER": ""
                    },
                    "FActivity5Id": {
                        "FNUMBER": ""
                    },
                    "FActivity6Id": {
                        "FNUMBER": ""
                    },
                    "FActivity1UnitID": {
                        "FNumber": ""
                    },
                    "FActivity2UnitID": {
                        "FNumber": ""
                    },
                    "FActivity3UnitID": {
                        "FNumber": ""
                    },
                    "FActivity4UnitID": {
                        "FNumber": ""
                    },
                    "FActivity5UnitID": {
                        "FNumber": ""
                    },
                    "FActivity6UnitID": {
                        "FNumber": ""
                    },
                    "FActivity1Qty": 0,
                    "FActivity2Qty": 0,
                    "FActivity3Qty": 0,
                    "FActivity4Qty": 0,
                    "FActivity5Qty": 0,
                    "FActivity6Qty": 0,
                    "FSetStartTime": "1900-01-01",
                    "FSetEndTime": "1900-01-01",
                    "FProcessStartTime": "1900-01-01",
                    "FProcessEndTime": "1900-01-01",
                    "FTeardownStartTime": "1900-01-01",
                    "FTeardownEndTime": "1900-01-01",
                    "FSourceBillType": "",
                    "FSourceBillNo": "",
                    "FSrcInterId": 0,
                    "FSrcEntrySeq": 0,
                    "FSrcEntryId": 0,
                    "FMoId": 0,
                    "FMoEntryId": 0,
                    "FOptPlanId": 0,
                    "FOptPlanSeqId": 0,
                    "FSeqType": "",
                    "FOptPlanOptId": 0,
                    "FStockInOrgId": {
                        "FNumber": ""
                    },
                    "FMoPrdOrgId": {
                        "FNumber": ""
                    },
                    "FMoPrdDept": {
                        "FNUMBER": ""
                    },
                    "FProjectNo": "",
                    "FMtoNo": "",
                    "FOptBillCreatType": "",
                    "FMilestoneOptNo": 0,
                    "FMilestoneOptDesc": "",
                    "FSrcMilesRptID": 0,
                    "FStockInQuaSelAuxQty": 0,
                    "FStockInQuaAuxQty": 0,
                    "FStockInFailSelAuxQty": 0,
                    "FStockInFailAuxQty": 0,
                    "FBaseUnitID": {
                        "FNumber": ""
                    },
                    "FBaseQuaQty": 0,
                    "FBaseWastageQty": 0,
                    "FBaseProcessFailQty": 0,
                    "FBaseMaterialFailQty": 0,
                    "FBaseFailQty": 0,
                    "FBaseReworkQty": 0,
                    "FBaseFinishQty": 0,
                    "FBaseStockInQuaSelQty": 0,
                    "FBaseStockInFailSelQty": 0,
                    "FBaseStockInQuaQty": 0,
                    "FBaseStockInFailQty": 0,
                    "FPrdUnitID": {
                        "FNumber": ""
                    },
                    "FPrdQuaQty": 0,
                    "FPrdWastageQty": 0,
                    "FPrdProcessFailQty": 0,
                    "FPrdMaterialFailQty": 0,
                    "FPrdFailQty": 0,
                    "FPrdReworkQty": 0,
                    "FPrdFinishQty": 0,
                    "FPrdStockInQuaSelQty": 0,
                    "FPrdStockInQuaQty": 0,
                    "FPrdStockInFailSelQty": 0,
                    "FPrdStockInFailQty": 0,
                    "FOwnerTypeId": "",
                    "FOwnerId": {
                        "FNumber": ""
                    },
                    "FBomId": {
                        "FNUMBER": ""
                    },
                    "FOptPlanNo": "",
                    "FBFLowId": {
                        "FName": ""
                    },
                    "FRouteId": {
                        "FNUMBER": ""
                    },
                    "FUnitTransHeadQty": 0,
                    "FUnitTransOperQty": 0,
                    "FStockId": {
                        "FNUMBER": ""
                    },
                    "FStockLocId": {
                        "FSTOCKLOCID__FF100001": {
                            "FNumber": ""
                        },
                        "FSTOCKLOCID__FF100003": {
                            "FNumber": ""
                        },
                        "FSTOCKLOCID__FF100004": {
                            "FNumber": ""
                        },
                        "FSTOCKLOCID__FF100005": {
                            "FNumber": ""
                        },
                        "FSTOCKLOCID__FF100006": {
                            "FNumber": ""
                        },
                        "FSTOCKLOCID__FF100007": {
                            "FNumber": ""
                        },
                        "FSTOCKLOCID__FF100008": {
                            "FNumber": ""
                        },
                        "FSTOCKLOCID__FF100009": {
                            "FNumber": ""
                        },
                        "FSTOCKLOCID__FF100010": {
                            "FNumber": ""
                        },
                        "FSTOCKLOCID__FF100011": {
                            "FNumber": ""
                        },
                        "FSTOCKLOCID__FF100012": {
                            "FNumber": ""
                        }
                    },
                    "FDefectsSelQty": 0,
                    "FNextOperId": 0,
                    "FBaseCheckSelQty": 0,
                    "FPrdCheckQty": 0,
                    "FBaseCheckQty": 0,
                    "FPrdCheckSelQty": 0,
                    "FQCSchemeId": {
                        "FNUMBER": ""
                    },
                    "FQualityCheck": "false",
                    "FWorkCenterId": {
                        "FNUMBER": ""
                    },
                    "FProcessId": {
                        "FNUMBER": ""
                    },
                    "FPrdTrackNo": "",
                    "FIsFirstPieceInspect": "false",
                    "FDefectType": {
                        "FNUMBER": ""
                    },
                    "FAuxEquipmentId": {
                        "FNUMBER": ""
                    },
                    "FIsInputPrd": "false",
                    "FReworkStatus": "",
                    "FReworkSrcRptNo": "",
                    "FReworkSrcRptId": 0,
                    "FReworkSrcRptSeq": 0,
                    "FReworkSrcRptEntryId": 0,
                    "FReworkSeqId": 0,
                    "FInspectTime": "1900-01-01",
                    "FManualAddNew": "false",
                    "FDispatchDetailEntryId": 0,
                    "FCostRate": 0,
                    "FReworkType": "",
                    "FReSelQty": 0,
                    "FReSelHeadQty": 0,
                    "FReSelBaseQty": 0,
                    "FDefectDetail": "",
                    "FBarCode": "",
                    "FCheckType": "",
                    "FWaitCheckQty": 0,
                    "FPrdWaitCheckQty": 0,
                    "FFullInputPsJson": "",
                    "FBaseWaitCheckQty": 0,
                    "FISFULLPROCESS": "false",
                    "FUnPackingMark": "",
                    "FMouldId": {
                        "FNUMBER": ""
                    },
                    "FMLot_Text": "",
                    "FDecimal_TotalTime": 0,
                    "FPrdSerialId": [
                        {
                            "FNumber": ""
                        }
                    ],
                    "FPrdSerialText": "",
                    "FActivity7Id": {
                        "FNUMBER": ""
                    },
                    "FActivity7UnitID": {
                        "FNumber": ""
                    },
                    "FActivity7Qty": 0,
                    "FActivity8Id": {
                        "FNUMBER": ""
                    },
                    "FActivity8UnitID": {
                        "FNumber": ""
                    },
                    "FActivity8Qty": 0,
                    "FGroupNum": "",
                    "FCustId": {
                        "FNUMBER": ""
                    },
                    "F_UNW_Qty_qtr": 0,
                    "F_UNW_Qty_9uj": 0,
                    "F_UNW_Qty_s58": 0,
                    "F_UNW_Qty_bgx": 0,
                    "F_UNW_Qty_tqn": 0,
                    "F_UNW_Qty_c1c": 0,
                    "F_UNW_Qty_vb1": 0,
                    "F_UNW_Qty_emq": 0,
                    "F_UNW_Qty_xwf": 0,
                    "F_UNW_Qty_yiu": 0,
                    "F_UNW_Qty_83g": 0,
                    "F_UNW_Qty_f74": 0,
                    "F_UNW_Text_rbx": "",
                    "F_UNW_Qty_hsj": 0,
                    "FSubEntity": [
                        {
                            "FDETAILID": 0,
                            "FEmpinfoId": {
                                "FStaffNumber": ""
                            },
                            "FEquipmentIdD": {
                                "FNUMBER": ""
                            },
                            "FWorkTime": 0,
                            "FResourceIdD": {
                                "FNUMBER": ""
                            }
                        }
                    ]
                }
            ]
        }
    }
}
//生产领料
export function getObj_scll() {
    return {
        "NeedUpDateFields": [],
        "NeedReturnFields": [],
        "IsDeleteEntry": "true",
        "SubSystemId": "",
        "IsVerifyBaseDataField": "false",
        "IsEntryBatchFill": "true",
        "ValidateFlag": "true",
        "NumberSearch": "true",
        "IsAutoAdjustField": "true",
        "InterationFlags": "",
        "IgnoreInterationFlag": "",
        "IsControlPrecision": "false",
        "ValidateRepeatJson": "false",
        "Model": {
            "FID": 0,
            "FBillType": {
                "FNUMBER": ""
            },
            "FDate": "1900-01-01",
            "FStockOrgId": {
                "FNumber": ""
            },
            "FStockId0": {
                "FNumber": ""
            },
            "FPrdOrgId": {
                "FNumber": ""
            },
            "FWorkShopId": {
                "FNumber": ""
            },
            "FOwnerTypeId0": "",
            "FOwnerId0": {
                "FNumber": ""
            },
            "FPickerId": {},
            "FSTOCKERID": {
                "FNAME": ""
            },
            "FDescription": "",
            "FCurrId": {
                "FNumber": ""
            },
            "FIsCrossTrade": "false",
            "FVmiBusiness": "false",
            "FScanBox": "",
            "FSourceType": "",
            "FIsOwnerTInclOrg": "false",
            "FEntity": [
                {
                    "FEntryID": 0,
                    "FParentMaterialId": {
                        "FNumber": ""
                    },
                    "FBaseStockActualQty": 0,
                    "FFPMBillNo": "",
                    "FConsome": "",
                    "FOptQueue": "",
                    "FReserveType": "",
                    "FMaterialId": {
                        "FNumber": ""
                    },
                    "FUnitID": {
                        "FNumber": ""
                    },
                    "FAppQty": 0,
                    "FActualQty": 0,
                    "FEntryVmiBusiness": "false",
                    "FStockId": {
                        "FNumber": ""
                    },
                    "FOptPlanBillNo": "",
                    "FStockLocId": {
                        "FSTOCKLOCID__FF100001": {
                            "FNumber": ""
                        },
                        "FSTOCKLOCID__FF100003": {
                            "FNumber": ""
                        },
                        "FSTOCKLOCID__FF100004": {
                            "FNumber": ""
                        },
                        "FSTOCKLOCID__FF100005": {
                            "FNumber": ""
                        },
                        "FSTOCKLOCID__FF100006": {
                            "FNumber": ""
                        },
                        "FSTOCKLOCID__FF100007": {
                            "FNumber": ""
                        },
                        "FSTOCKLOCID__FF100008": {
                            "FNumber": ""
                        },
                        "FSTOCKLOCID__FF100009": {
                            "FNumber": ""
                        },
                        "FSTOCKLOCID__FF100010": {
                            "FNumber": ""
                        },
                        "FSTOCKLOCID__FF100011": {
                            "FNumber": ""
                        },
                        "FSTOCKLOCID__FF100012": {
                            "FNumber": ""
                        }
                    },
                    "FOptPlanBillId": 0,
                    "FWorkCenterId": {
                        "FNUMBER": ""
                    },
                    "FLot": {
                        "FNumber": ""
                    },
                    "FOptDetailId": 0,
                    "FCobyBomEntryID": 0,
                    "FProcessId": {
                        "FNumber": ""
                    },
                    "FBomId": {
                        "FNumber": ""
                    },
                    "FGroupRow": "",
                    "FSrcPickEntryId": 0,
                    "FSrcBusinessType": "",
                    "FStockStatusId": {
                        "FNumber": ""
                    },
                    "FQueryStockUpdate": "",
                    "FProduceDate": "1900-01-01",
                    "FTransRetFormId": "",
                    "FTransRetBillNo": "",
                    "FTransRetId": 0,
                    "FSendRowId": "",
                    "FTransRetEntryId": 0,
                    "FTransRetEntrySeq": 0,
                    "FCheckReturnMtrl": "false",
                    "FIsOverLegalOrg": "false",
                    "FPlanEntryID": 0,
                    "FEntrtyMemo": "",
                    "FISSUEINFOENTRYID": 0,
                    "FMtoNo": "",
                    "FProjectNo": "",
                    "FMoBillNo": "",
                    "FMoEntryId": 0,
                    "FPPBomEntryId": 0,
                    "FOperId": 0,
                    "FOwnerTypeId": "",
                    "FStockUnitId": {
                        "FNumber": ""
                    },
                    "FStockAppQty": 0,
                    "FStockActualQty": 0,
                    "FStockAllowOverQty": 0,
                    "FSecUnitId": {
                        "FNumber": ""
                    },
                    "FSecActualQty": 0,
                    "FSecAllowOverQty": 0,
                    "FMoId": 0,
                    "FMoEntrySeq": 0,
                    "FAllowOverQty": 0,
                    "FPPBomBillNo": "",
                    "FBaseUnitId": {
                        "FNumber": ""
                    },
                    "FBaseAppQty": 0,
                    "FBaseActualQty": 0,
                    "FBaseAllowOverQty": 0,
                    "FEntryWorkShopId": {
                        "FNumber": ""
                    },
                    "FAuxPropId": {
                        "FAUXPROPID__FF100001": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100002": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100003": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100004": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100005": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100006": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100007": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100008": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100009": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100010": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100011": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100012": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100013": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100014": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100015": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100027": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100018": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100021": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100025": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100029": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100026": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100024": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100017": {
                            "FNumber": ""
                        }
                    },
                    "FKeeperTypeId": "",
                    "FKeeperId": {
                        "FNumber": ""
                    },
                    "FOwnerId": {
                        "FNumber": ""
                    },
                    "FExpiryDate": "1900-01-01",
                    "FSrcBillType": "",
                    "FSrcBillNo": "",
                    "FPrice": 0,
                    "FEntrySrcInterId": 0,
                    "FAmount": 0,
                    "FEntrySrcEnteryId": 0,
                    "FEntrySrcEntrySeq": 0,
                    "FParentOwnerTypeId": "",
                    "FParentOwnerId": {
                        "FNumber": ""
                    },
                    "FSRCBIZBILLTYPE": {
                        "FNAME": ""
                    },
                    "FSRCBIZBILLNO": "",
                    "FSRCBIZINTERID": 0,
                    "FSRCBIZENTRYID": 0,
                    "FSRCBIZENTRYSEQ": 0,
                    "FPickingStatus": 0,
                    "FSerialSubEntity": [
                        {
                            "FDetailID": 0,
                            "FSerialNo": "",
                            "FSerialId": {
                                "FNumber": ""
                            },
                            "FSerialNote": "",
                            "FIsAppInspect": ""
                        }
                    ]
                }
            ]
        }
    }
}
//生产补料
export function getObj_scbl() {
    return {
        "NeedUpDateFields": [],
        "NeedReturnFields": [],
        "IsDeleteEntry": "true",
        "SubSystemId": "",
        "IsVerifyBaseDataField": "false",
        "IsEntryBatchFill": "true",
        "ValidateFlag": "true",
        "NumberSearch": "true",
        "IsAutoAdjustField": "true",
        "InterationFlags": "",
        "IgnoreInterationFlag": "",
        "IsControlPrecision": "false",
        "ValidateRepeatJson": "false",
        "Model": {
            "FID": 0,
            "FBillType": {
                "FNUMBER": ""
            },
            "FDate": "1900-01-01",
            "FStockOrgId": {
                "FNumber": ""
            },
            "FStockId0": {
                "FNumber": ""
            },
            "FPrdOrgId": {
                "FNumber": ""
            },
            "FWorkShopId": {
                "FNumber": ""
            },
            "FOwnerTypeId0": "",
            "FOwnerId0": {
                "FNumber": ""
            },
            "FPickerId": {},
            "FSTOCKERID": {
                "FNAME": ""
            },
            "FDescription": "",
            "FCurrId": {
                "FNumber": ""
            },
            "FIsCrossTrade": "false",
            "FVmiBusiness": "false",
            "FScanBox": "",
            "FIsOwnerTInclOrg": "false",
            "FEntity": [
                {
                    "FEntryID": 0,
                    "FParentMaterialId": {
                        "FNumber": ""
                    },
                    "FConsome": "",
                    "FReserveType": "",
                    "FBaseStockActualQty": 0,
                    "FMaterialId": {
                        "FNumber": ""
                    },
                    "FUnitID": {
                        "FNumber": ""
                    },
                    "FAppQty": 0,
                    "FActualQty": 0,
                    "FEntryVmiBusiness": "false",
                    "FScrapQty": 0,
                    "FOptQueue": "",
                    "FOptPlanBillNo": "",
                    "FStockId": {
                        "FNumber": ""
                    },
                    "FOptPlanBillId": 0,
                    "FStockLocId": {
                        "FSTOCKLOCID__FF100001": {
                            "FNumber": ""
                        },
                        "FSTOCKLOCID__FF100003": {
                            "FNumber": ""
                        },
                        "FSTOCKLOCID__FF100004": {
                            "FNumber": ""
                        },
                        "FSTOCKLOCID__FF100005": {
                            "FNumber": ""
                        },
                        "FSTOCKLOCID__FF100006": {
                            "FNumber": ""
                        },
                        "FSTOCKLOCID__FF100007": {
                            "FNumber": ""
                        },
                        "FSTOCKLOCID__FF100008": {
                            "FNumber": ""
                        },
                        "FSTOCKLOCID__FF100009": {
                            "FNumber": ""
                        },
                        "FSTOCKLOCID__FF100010": {
                            "FNumber": ""
                        },
                        "FSTOCKLOCID__FF100011": {
                            "FNumber": ""
                        },
                        "FSTOCKLOCID__FF100012": {
                            "FNumber": ""
                        }
                    },
                    "FWorkCenterId": {
                        "FNUMBER": ""
                    },
                    "FOptDetailId": 0,
                    "FLot": {
                        "FNumber": ""
                    },
                    "FProcessId": {
                        "FNumber": ""
                    },
                    "FBomId": {
                        "FNumber": ""
                    },
                    "FTransRetFormId": "",
                    "FTransRetBillNo": "",
                    "FTransRetId": 0,
                    "FTransRetEntryId": 0,
                    "FTransRetEntrySeq": 0,
                    "FFeedReasonId": {
                        "FNumber": ""
                    },
                    "FIsOverLegalOrg": "false",
                    "FCheckReturnMtrl": "false",
                    "FEntrtyDescription": "",
                    "FCPDBLQTY": 0,
                    "FStockStatusId": {
                        "FNumber": ""
                    },
                    "FProduceDate": "1900-01-01",
                    "FMtoNo": "",
                    "FProjectNo": "",
                    "FMoBillNo": "",
                    "FMoEntryId": 0,
                    "FPPBomEntryId": 0,
                    "FOperId": 0,
                    "FOwnerTypeId": "",
                    "FStockAppQty": 0,
                    "FStockActualQty": 0,
                    "FSecActualQty": 0,
                    "FMoId": 0,
                    "FMoEntrySeq": 0,
                    "FBaseAppQty": 0,
                    "FStockScrapQty": 0,
                    "FSecScrapQty": 0,
                    "FBaseScrapQty": 0,
                    "FPPBomBillNo": "",
                    "FBaseUnitId": {
                        "FNumber": ""
                    },
                    "FStockUnitId": {
                        "FNumber": ""
                    },
                    "FSecUnitId": {
                        "FNumber": ""
                    },
                    "FEntryWorkShopId": {
                        "FNumber": ""
                    },
                    "FBaseActualQty": 0,
                    "FAuxPropId": {
                        "FAUXPROPID__FF100001": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100002": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100003": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100004": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100005": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100006": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100007": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100008": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100009": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100010": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100011": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100012": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100013": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100014": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100015": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100027": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100018": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100021": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100025": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100029": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100026": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100024": {
                            "FNumber": ""
                        },
                        "FAUXPROPID__FF100017": {
                            "FNumber": ""
                        }
                    },
                    "FKeeperTypeId": "",
                    "FKeeperId": {
                        "FNumber": ""
                    },
                    "FOwnerId": {
                        "FNumber": ""
                    },
                    "FExpiryDate": "1900-01-01",
                    "FEntrySrcInterId": 0,
                    "FEntrySrcBillType": "",
                    "FEntrySrcEnteryId": 0,
                    "FEntrySrcBillNo": "",
                    "FPrice": 0,
                    "FAmount": 0,
                    "FParentOwnerTypeId": "",
                    "FParentOwnerId": {
                        "FNumber": ""
                    },
                    "FEntrySrcEntrySeq": 0,
                    "FSrcBizBillType": {
                        "FNAME": ""
                    },
                    "FSrcBizBillNo": "",
                    "FSrcBizInterId": 0,
                    "FSrcBizEntryId": 0,
                    "FSrcBizEntrySeq": 0,
                    "FSerialSubEntity": [
                        {
                            "FDetailID": 0,
                            "FSerialNo": "",
                            "FSerialId": {
                                "FNumber": ""
                            },
                            "FSerialNote": "",
                            "FIsAppInspect": ""
                        }
                    ]
                }
            ]
        }
    }
}