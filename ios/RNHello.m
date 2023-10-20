//
//  RNHello.m
//  IosAds
//
//  Created by ChicMic on 20/10/23.
//
#import <React/RCTLog.h>
#import "RNHello.h"

@implementation RNHello

// To export a module named RCTCalendarModule
RCT_EXPORT_MODULE();


RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location)
{
  RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
}

RCT_EXPORT_METHOD(findEvents:(RCTResponseSenderBlock)callback)
{
//load
  
  //load
  callback(@[@"5"]);
}

@end
